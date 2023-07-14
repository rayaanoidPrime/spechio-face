import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'
import axios from 'axios';


const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageEncoded, setEncoded] = useState(null);
  const [skinType, setSkinType] = useState(null);
  const [skinTone, setSkinTone] = useState(null);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setEncoded(imageSrc.substring(23, imageSrc.length))
    console.log(imageSrc.substring(23, imageSrc.length))
  }, []);

  async function makePredictPostRequest() {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('filename', 'pic.jpeg');
      bodyFormData.append('filedata' , imageEncoded);
      console.log(bodyFormData);
      const response = await axios.post('http://localhost:8000/skin',bodyFormData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data);
      setSkinType(response.data[0]["type"]);
      setSkinTone(response.data[0]["tone"]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-gray-50`}
    >
     <Layout>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className='text-5xl bg-clip-text bg-gradient-to-r from-prim via-sec to-quad text-transparent font-extrabold '>
          Spechio Face AI
        </div>
        <div className='text-purple-900 text-lg font-bold mt-2'>
            Facial Feature extracter and Beauty Product recommendation engine
        </div>
        <div className='webcam-container'>
            <div className='webcam-col'>
              <Webcam  audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className='webcam-preview'/>
              <button className='rounded-2xl bg-gradient-to-r from-pent to-quad p-2 px-4 border-2 hover:opacity-80 mt-10 shadow-xl' onClick={captureImage}>Capture</button>
            </div>
            <div className='webcam-col'>
              {capturedImage && <img className='webcam-preview' src={capturedImage} alt="Captured" />}
              {capturedImage ? <button className='rounded-2xl bg-gradient-to-r from-pent to-quad p-2 px-4 border-2 hover:opacity-80 mt-10 shadow-xl' onClick={makePredictPostRequest}>Use</button> : <></>}
            </div>
            <div>
              {skinType && skinTone ? <div>
              <p>
                Your Skin Type is : {skinType} 
              </p>
              <p>
                Your Skin Tone is : {skinTone}
              </p>
              </div> : <></>}
            </div>
        </div> 
      </div>
      </Layout>      
    </main>
  );
};

export default WebcamComponent;
