import React from 'react';

import { ReactComponent as CorrectIcon } from '../images/correct.svg'
import { ReactComponent as ChooseIcon } from '../images/choose.svg'
import { ReactComponent as WrongIcon } from '../images/wrong.svg'

export interface IAnswerCardButton {
    resposta: string,
    ordem: number,
    mostrarCorreta: boolean,
    onChangeSelected: (ordem: number) => void,
    respostaSelected: number,
    respostaCorreta: number
}
export const AnswerCardButton: React.FC<IAnswerCardButton> = ({resposta, ordem, mostrarCorreta, onChangeSelected, respostaSelected, respostaCorreta}) => {

    return (
        <>
            {((mostrarCorreta && respostaCorreta !== ordem) || !mostrarCorreta) && respostaSelected !== ordem && <button disabled={respostaSelected !== 0} onClick={()=>{onChangeSelected(ordem)}} className="flex w-50 h-16 md:h-32  md:w-2/4 md:justify-start bg-white rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-gray-600 rounded-full md:rounded flex items-center justify-center "> {String.fromCharCode(96 + ordem).toUpperCase()}</div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-black">{resposta}</p>
               
            </button>}

            {((!mostrarCorreta && respostaCorreta !== ordem)) && respostaSelected === ordem && <button disabled={respostaSelected !== 0} onClick={()=>{onChangeSelected(ordem)}} className="flex w-50 h-16 md:h-32  md:w-2/4 md:justify-start bg-gray-600 rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-white rounded-full md:rounded flex items-center justify-center "> <ChooseIcon className="md:mt-2 h-9 w-9" /></div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-white">{resposta}</p>
               
            </button>}

            {((mostrarCorreta && respostaCorreta !== ordem)) && respostaSelected === ordem && <button disabled={respostaSelected !== 0} onClick={()=>{onChangeSelected(ordem)}} className="flex w-50 h-16 md:h-32  md:w-2/4 md:justify-start bg-red-600 rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-white rounded-full md:rounded flex items-center justify-center "> <WrongIcon fill="red" className="md:mt-2 h-9 w-9" /></div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-white">{resposta}</p>
               
            </button>}

            {((mostrarCorreta && respostaCorreta === ordem)) && <div className="flex w-50 h-16 md:h-32 md:w-2/4 md:justify-start bg-green-500 rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-white rounded-full md:rounded flex items-center justify-center "><CorrectIcon className="md:mt-2" fill='green'/></div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-white">{resposta}</p>
               
            </div>}

            
        </>
    )

}