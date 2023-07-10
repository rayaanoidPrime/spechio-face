"""
To classify the input skin into one of the 6 skin tones
"""
import pandas as pd
import os
from sklearn.neighbors import KNeighborsClassifier
from models.skin_tone_model.skin_detection import skin_colours


def skin_tone_knn(img_path,dataset):
    mean_colour_values = skin_colours(img_path)
    df = pd.read_csv(dataset)
    X = df.iloc[:, [1, 2, 3]].values
    y = df.iloc[:, 0].values

    classifier = KNeighborsClassifier(n_neighbors=6, metric='minkowski', p=2)
    classifier.fit(X, y)

    X_test = [mean_colour_values]
    y_pred = classifier.predict(X_test)
    return y_pred[0]