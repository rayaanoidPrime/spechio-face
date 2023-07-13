import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, []);

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
              {capturedImage ? <button className='rounded-2xl bg-gradient-to-r from-pent to-quad p-2 px-4 border-2 hover:opacity-80 mt-10 shadow-xl'>Use</button> : <></>}
            </div>
        </div> 
      </div>
      </Layout>      
    </main>
  );
};

export default WebcamComponent;
