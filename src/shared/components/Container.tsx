import React from 'react'
import backgroundImage from '../images/backgroundImageApp.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IContainer {
    children?: React.ReactNode
}

export const Container: React.FC<IContainer> = ({ children }) => {

    return (
        <>
            <div className="bg-cover bg-no-repeat w-screen bg-bottom h-screen select-none font-poppins max-sm:text-base"
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="flex w-full h-full rounded-md">
                    {children}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}