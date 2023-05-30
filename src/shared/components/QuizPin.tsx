import React from 'react';
import QRCode from 'react-qr-code'
import QRCodeLink from 'qrcode'

interface IQuizPin {
    roomNumber: number
}
export const QuizPin: React.FC<IQuizPin> = ({ roomNumber }) => {

    const navigateToQuiz = `${window.location.origin}/quiz?room=${roomNumber}`
    
    const handleGenerateImage = () =>{

        QRCodeLink.toDataURL(navigateToQuiz, {
            width: 600,
            margin: 3
            
        }, (erro, url)=>{
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.download = 'qrcodeEducaQuest.jpg';
            link.click();
        })
    }

    return (
        <>
            <div className='flex space-x-2 text-black'>
                <div className="flex flex-col space-y-1 w-32 h-14 md:w-full md:h-full md:justify-center  items-center bg-white">
                    <div className="text-sm md:text-2xl">Sala PIN:</div>
                    <div className="text-2xl  md:text-6xl font-extrabold">{roomNumber}</div>
                </div>
                <div className="w-16 h-14 md:w-56 md:h-36 bg-white flex justify-center items-center">
                    <QRCode onClick={()=>{handleGenerateImage()}} className="w-14 h-12 md:w-52 md:h-32 cursor-pointer"  value={navigateToQuiz} />
                </div>
            </div>
        </>
    )

}