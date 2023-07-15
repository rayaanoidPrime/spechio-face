import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'
import FileDrop from "@/components/filedrop";
import { useReducer, useState } from 'react';
import axios from 'axios';
import SkinToneColor from '@/components/skin_tone';
import ProductRecommendation from '@/components/product_recommendation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const [skinType, setSkinType] = useState(null);
const [skinTone, setSkinTone] = useState(null);


async function base64EncodeFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const encodedString = btoa(reader.result);
      resolve(encodedString);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
}



async function makePredictPostRequest(filename, filedata) {
  try {
    var encodedFile = await base64EncodeFile(filedata)
    console.log(encodedFile)
    var bodyFormData = new FormData();
    bodyFormData.append('filename', filename);
    bodyFormData.append('filedata' , encodedFile);
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

async function goBack(){
  setSkinTone(null);
  setSkinType(null);
}


  const reducer = (state , action ) => {
    switch (action.type) {
        case "SET_IN_DROP_ZONE" : 
            return {...state , inDropZone : action.inDropZone}
        case "ADD_FILE_TO_LIST" :
            return {...state, fileList : state.fileList.concat(action.files)}
        default : 
            return state;
    }
}

  const [data , dispatch] = useReducer(reducer , {
      inDropZone : false,
      fileList : []
  });

  const handleSubmit = () => {
    console.log(data.fileList[0]);
    makePredictPostRequest(data.fileList[0]["name"], data.fileList[0]);
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-gray-50 ${inter.className}`}
    >
     <Layout>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className='text-5xl bg-clip-text bg-gradient-to-r from-prim via-sec to-quad text-transparent font-extrabold '>
          Spechio Face AI
        </div>
        <div className='text-purple-900 text-lg font-bold mt-2'>
            Facial Feature extracter and Beauty Product recommendation engine
        </div>
        { skinTone && skinType ? <></> : <FileDrop data={data} dispatch={dispatch} />}
        {data.fileList && data.fileList.length>0 && !skinTone && ! skinType ?
          <button onClick={handleSubmit} type='submit' className='rounded-2xl bg-gradient-to-r from-pent to-quad p-2 px-4 border-2 hover:opacity-80 mt-10 shadow-xl'>Submit</button> 
          : <></> 
        }
      </div>
      <div className='text-purple-900 text-lg font-bold mt-2 center above'>
              {skinType && skinTone ? <div>
              <p className='center'>
                Skin Type : {skinType} 
              </p>
              <SkinToneColor skinTone={skinTone} />
              <ProductRecommendation skinType={skinType} skinTone={skinTone} />
              <button onClick={goBack} type='submit' className='rounded-2xl bg-gradient-to-r from-pent to-quad p-2 px-4 border-2 hover:opacity-80 mt-10 shadow-xl'>Go Back</button>
              </div> : <></>}
      </div>
      </Layout>
    </main>
  )
}
