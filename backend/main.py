import os
import numpy as np
from PIL import Image
import onnxruntime as rt
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
    providers = ['CPUExecutionProvider']
    onnx_model = 'models/skin_type_model/model1.onnx'
    skin_type_model = rt.InferenceSession(onnx_model, providers=providers)
    print('Skin type model loaded')


def load_and_prep(filepath):
    # Load the image using PIL
    img = Image.open(filepath)
    # Resize the image to the target size
    img_resized = img.resize((224, 224))
    # Convert the image to a NumPy array
    img_array = np.array(img_resized)
    # Add a batch dimension
    img_tensor = np.expand_dims(img_array, axis=0)
    # Normalize the image
    img_tensor = img_tensor.astype(np.float32)
    return img_tensor

def prediction_skin(img_path):
    img_processed = load_and_prep(img_path)
    class_names = ["Dry_Skin", "Oily_Skin"]
    output_names = ['output_layer']
    onnx_pred = skin_type_model.run(output_names, {"input": img_processed})
    # print(pred1)
    # if len(pred[0]) > 1:
    #     pred_class1 = class_names[tf.argmax(pred[0])]
    # else:
    #     pred_class1 = class_names[int(tf.round(pred[0]))]
    # return pred_class1
    pred_class = class_names[onnx_pred[0][0].argmax()]
    return pred_class


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