import React from "react";

export const Layout = ({children}) => {
    return (
        <div
            className=" absolute h-screen w-full flex items-center justify-center "
        >
            <div className=" absolute space-y-4 m-8">
                {children}
            </div>
            <div className="relative -right-14 w-72 h-72 bg-prim rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
            <div className="relative left-14 w-72 h-72 bg-sec rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob animation-delay-2000 "></div>
            <div className="relative  w-72 h-72 bg-quad rounded-full mix-blend-multiply fliter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
            
        </div>
    )
}