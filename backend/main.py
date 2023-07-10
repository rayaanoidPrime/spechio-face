import os
import numpy as np
from PIL import Image
import tensorflow as tf
from models.skin_tone_model.skin_tone_knn import skin_tone_knn
import base64
from io import BytesIO
from PIL import Image
from fastapi import FastAPI, Form

class_names = ['Dry_skin', 'Oily_skin']

skin_tone_dataset = 'models/skin_tone_model/skin_tone_dataset.csv'

app = FastAPI()

def get_model():
    global skin_type_model
    skin_type_model = tf.keras.models.load_model('./models/skin_type_model')
    print('Skin type model loaded')


def load_image(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    # (height, width, channels)
    img_tensor = tf.keras.preprocessing.image.img_to_array(img)
    # (1, height, width, channels), add a dimension because the model expects this shape: (batch_size, height, width, channels)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    # imshow expects values in the range [0, 1]
    img_tensor /= 255.
    return img_tensor

def prediction_skin(img_path):
    new_image = load_image(img_path)
    pred = skin_type_model.predict(new_image)
    # print(pred1)
    if len(pred[0]) > 1:
        pred_class1 = class_names[tf.argmax(pred[0])]
    else:
        pred_class1 = class_names[int(tf.round(pred[0]))]
    return pred_class1


get_model()

# img_put_args = reqparse.RequestParser()
# img_put_args.add_argument(
#     "file", help="Please provide a valid image file", required=True)


# rec_args = reqparse.RequestParser()

# rec_args.add_argument(
#     "tone", type=int, help="Argument required", required=True)
# rec_args.add_argument(
#     "type", type=str, help="Argument required", required=True)
# rec_args.add_argument("features", type=dict,
#                       help="Argument required", required=True)


# class SkinMetrics(BaseModel):
#     img : Image
#     def put(self):
#         args = img_put_args.parse_args()
#         print(args)
#         file = args['file']
#         starter = file.find(',')
#         image_data = file[starter+1:]
#         image_data = bytes(image_data, encoding="ascii")
#         im = Image.open(BytesIO(base64.b64decode(image_data)))

#         filename = 'image.png'
#         file_path = os.path.join('./static', filename)
#         im.save(file_path)
#         skin_type = prediction_skin(file_path).split('_')[0]
#         tone = skin_tone_knn(file_path, dataset=skin_tone_dataset)
#         print(skin_type)
#         print(tone)

#         return {'type': skin_type, 'tone': str(tone)}, 200



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/skin")
async def predict(filename: str = Form(...), filedata: str = Form(...)):
    image_as_bytes = bytes(filedata , encoding="ascii")  # convert string to bytes
    img = Image.open(BytesIO(base64.b64decode(image_as_bytes)))  # decode base64string
    file_path = os.path.join('./static', filename)
    img.save(file_path)
    skin_type = prediction_skin(file_path).split('_')[0]
    tone = skin_tone_knn(file_path, dataset=skin_tone_dataset)
    print(skin_type)
    print(tone)

    return {'type': skin_type, 'tone': str(tone)}, 200


if __name__ == "__main__":
    app.run(debug=False)