import React from 'react'


export const FilePreview  = ({fileData}) => {
    return (
        <div className='p-2'>
            <div className='flex flex-col items-center'>
                {fileData.fileList.map((f)=>{
                    return (
                        <ol>
                            <li key={f.lastModified} className="flex">
                                <div key={f.name} className="ml-1 text-black">
                                    {f.name}
                                </div>
                            </li>
                        </ol>
                    )
                })}
            </div>
        </div>
    )
}