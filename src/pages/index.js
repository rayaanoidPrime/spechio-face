import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'
import FileDrop from "@/components/filedrop";
import { useReducer } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
        <FileDrop data={data} dispatch={dispatch} />
      </div>
      </Layout>      
    </main>
  )
}
