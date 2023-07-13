import React, { Dispatch, useReducer } from "react";
import { FilePreview } from "./filepreview";




const FileDrop   = ({data , dispatch}) => {

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type : "SET_IN_DROP_ZONE",
            inDropZone : true,
            files : []
        })
    }

    const handleDragLeave = (e ) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            inDropZone : false ,
            type : "SET_IN_DROP_ZONE",
            files : []
        })
    }

    const handleDragOver = (e ) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "copy";
        dispatch({
            inDropZone : true,
            type : "SET_IN_DROP_ZONE",
            files : []
        })

    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files]
        if (files && files.length>0){
            
            const exisitingFiles = data.fileList.map((f)=>f.name);
            files = files.filter((f) => !exisitingFiles.includes(f.name))

            dispatch({
                files : files,
                type : "ADD_FILE_TO_LIST",
                inDropZone : false
            });

            dispatch({
                type : "SET_IN_DROP_ZONE",
                inDropZone : false,
                files : []
            });
        }

    }

    const handleFileSelect = (e ) => {
        
        let files = [...(e.target.files)];

        if(files && files.length>0){

            const exisitingFiles = data.fileList.map((f)=>f.name);
            files = files.filter((f) => !exisitingFiles.includes(f.name));
            dispatch({
                type: "ADD_FILE_TO_LIST",
                files : files,
                inDropZone : false
            })

        }
    }

    return(
        <div className="flex flex-col w-3/4 items-center mt-10 z-10">
            <h1 className="text-black font-semibold mb-5 text-3xl text-quad">Drag And Drop</h1>
            <div className={`items-center border-1 shadow-xl ${data.inDropZone === true ? "border-sky-800 bg-gray-400 bg-opacity-40" : "border-gray-400 bg-gray-100 bg-opacity-30 "} rounded-lg p-4 h-80 w-96 mb-auto flex justify-center`}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragOver={(e)=> handleDragOver(e)}
                onDrop={(e) => handleDrop(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                >
                <div className="text-center ">
                    <FilePreview fileData={data} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-15 w-12 text-gray-400 mb-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 15l4 4 4-4M8 9l4-4 4 4M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                    <label htmlFor="fileSelect" className="text-center border-1 bg-indigo-900 opacity-80 hover:opacity-100 px-3 rounded-xl hover:bg-indigo-600 text-white py-0.5 hover:cursor-pointer">You can select multiple Files</label>
                    <input id="fileSelect" onChange={(e) => handleFileSelect(e)} type="file" multiple className=" absolute top-[-9999px] " />
                    <p className="mt-1 text-sm text-gray-600">Drag and drop your files here</p> 
                    <p className="mt-1 text-sm text-gray-600">OR</p> 
                    <a href="./webcam" className="mt-1 text-sm text-gray-600">Use Webcam</a> 
                </div>
            </div>
        </div>
    )
}

export default FileDrop;