from skin_detection import skin_tone
from skin_detection import skin_colours
from skin_clustering import skin_knn


img1 = "public\\test_imgs\\test_1.jpg"
img2 = "public\\test_imgs\\test_2.jpg"

mean_skin_colours = skin_colours(img1)

skin_tone_cs = skin_tone(mean_skin_colours)
skin_tone_knn = skin_knn(mean_skin_colours)

# print(skin_tone_cs )
# print(skin_tone_knn)

