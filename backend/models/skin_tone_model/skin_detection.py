import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

pd.options.mode.chained_assignment = None  # default='warn'

def skin_colours(img_path):
    # read image in BGR and resize it 
    img = read_image(img_path , maxh=500, maxw=500)
    #transfrom image into HSV , YCrCb colour space
    images = image_conversions(img)
    # determine pixels with skin colour values
    h,w = skin_predict(images)

    dframe , dframe_removed = process(images)
    skin_cluster_row , skin_cluster_label = skin_cluster(dframe)
    cluster_label_mat = cluster_matrix(
        dframe,
        dframe_removed,
        skin_cluster_label,
        h,
        w
    )
    # final_segment(images , cluster_label_mat)
    # display_all_images(images)
    #write the images

    # skin_cluster_row = np.delete(skin_cluster_row , 1)
    # skin_cluster_row = np.delete(skin_cluster_row , 2)

    return np.delete(skin_cluster_row, -1)


def display_image(image, name):
    window_name = name
    cv2.namedWindow(window_name)
    cv2.imshow(window_name, image)
    cv2.waitKey()
    cv2.destroyAllWindows()

# Display all images


def display_all_images(images):
    for key, value in images.items():
        display_image(value, key)

# write all images


def write_all_images(images):
    for key, value in images.items():
        cv2.imwrite(key+'.jpg', value)


#read an image using openCV

def read_image(path , maxh=500 , maxw=500):

    img_BGR = cv2.imread(path ,3 )
    img_BGR = cv2.imread(path, 3)
    img_BGR = cv2.resize(img_BGR, (375, 500))
    return img_BGR

# Grayscle and Thresholding and HSV & YCrCb color space conversions
def image_conversions(img_BGR):
    images = {
        "BGR" : img_BGR,
        "grayscale" : cv2.cvtColor(img_BGR , cv2.COLOR_BGR2GRAY),
    }

    images["thresholded_masked"] = thresholding_masking(images)
    images["HSV"] = cv2.cvtColor( images["thresholded_masked"] , cv2.COLOR_BGR2HSV )
    images["YCrCb"] = cv2.cvtColor(images["thresholded_masked"] , cv2.COLOR_BGR2YCrCb)

    # display_all_images(images)
    return images


def thresholding_masking(images):
    histogram, bin_edges = np.histogram(
        images["grayscale"].ravel(), 256, [0, 256])
    Totsu , thresholded_img_otsu = cv2.threshold(
        images["grayscale"] ,
        0 ,
        255,
        cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )
    Tmax = np.where(histogram[:] == max(histogram[:]))[0][0]
    Tfinal = round((Tmax + Totsu)/2) if Tmax > 10 else round((Tmax + Totsu)/4)
    
    threshold_type = (cv2.THRESH_BINARY if Tmax <
                      220 else cv2.THRESH_BINARY_INV)
    
    #segmenting
    Tfinal, thresholded_image = cv2.threshold(
        images["grayscale"], Tfinal, 255, threshold_type)
    
    #masking pg BGR image according to segmented image in grayscale
    masked_img = cv2.bitwise_and(
        images["BGR"] ,
        images["BGR"] ,
        mask=thresholded_image
    )

    return masked_img


# Determine the skin pixels based on colour values
# All pixels fitting the criteria : (Hue <= 170) and (140 <= Cr <= 170) and (90 <= Cb <= 120)
# are classified as skin pixels
def skin_predict(images):
    h,w =  images["grayscale"].shape
    images["skin"] = np.copy(images["grayscale"])

    for i in range(h):
        for j in range(w):
            if((images["HSV"].item(i, j, 0) <= 170) and (140 <= images["YCrCb"].item(i, j, 1) <= 170) and (90 <= images["YCrCb"].item(i, j, 2) <= 120)):
                images["skin"][i, j] = 255
            else:
                images["skin"][i, j] = 0
    return h, w


def process(images):

    #process image into custom dataframe with columns H , Y , X , Cr , Cb , I

    dframe = pd.DataFrame()

    # extract H values
    dframe['H'] = images["HSV"].reshape([-1, 3])[:, 0]

    # # Getting the y-x coordintates of white (foreground) pixels
    # gray = cv2.cvtColor(images["thresholded_masked"], cv2.COLOR_BGR2GRAY)
    # yx_coords = np.column_stack(np.where(gray >= 0))
    # dframe['Y'] = yx_coords[:, 0]
    # dframe['X'] = yx_coords[:, 1]

    # extracting Cr , Cb , Y values 
    dframe['Cr'] = images["YCrCb"].reshape([-1, 3])[:, 1]
    dframe['Cb'] = images["YCrCb"].reshape([-1, 3])[:, 2]

    # reshaping image array into 1 row and N columns
    dframe['I'] = images["skin"].reshape([1, images["skin"].size])[0]
 
    # Remove Black pixels - which are already segmented
    dframe_removed = dframe[dframe['H'] == 0]
    dframe.drop(dframe[dframe['H'] == 0].index, inplace=True)
    return dframe, dframe_removed

# cluster skin pixels using K-means


def skin_cluster(dframe):
    # K-means
    kmeans = KMeans(
        init="random",
        n_clusters=3, 
        n_init=5,
        max_iter=100,
        random_state=42
    )
    kmeans.fit(dframe)

    # Get the skin cluster label - which has the highest I value
    km_cc = kmeans.cluster_centers_
    skin_cluster_row = km_cc[km_cc[:, -1] == max(km_cc[:, -1]), :] #look at KMeans docs
    skin_cluster_label = np.where(
        [np.allclose(row, skin_cluster_row) for row in km_cc])[0][0]

    # Add cluster-label column to the dataframe
    dframe['cluster'] = kmeans.labels_
    return skin_cluster_row, skin_cluster_label


# Append removed pixels to the dataframe and get cluster matrix
def cluster_matrix(dframe, dframe_removed, skin_cluster_label, height, width):
    dframe_removed['cluster'] = np.full((len(dframe_removed.index), 1), -1)
    dframe = dframe.append(dframe_removed, ignore_index=False).sort_index()
    dframe['cluster'] = (dframe['cluster'] ==
                         skin_cluster_label).astype(int) * 255
    cluster_label_mat = np.asarray(
        dframe['cluster'].values.reshape(height, width), dtype=np.uint8)
    return cluster_label_mat

# final segmentation by masking with cluster labels (0,)

def final_segment(images, cluster_label_mat):
    final_segment_img = cv2.bitwise_and(
        images["BGR"], images["BGR"], mask=cluster_label_mat)
    images["final_segment"] = final_segment_img
    # display_image(final_segment_img, "final segmentation")


"""
To classify the input skin into one of the 6 skin tones
"""
from sklearn.metrics.pairwise import cosine_similarity


def skin_tone(mean_values):
    # df = pd.read_csv("public\pre-processing\skin_tone_dataset_RGB.csv")
    df = pd.read_csv("public\skin_tone_dataset.csv")
    y = mean_values
    df['cs'] = [cosine_similarity([X], [y])[0][0]
                for X in df.iloc[:, [1, 2, 3]].values]
    skin_tone = df.sort_values(by=['cs'], ascending=False).iloc[0]['Type']
    return skin_tone