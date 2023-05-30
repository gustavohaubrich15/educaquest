import React from 'react';

import { ReactComponent as CorrectIcon } from '../images/correct.svg'

export interface IAnswerCard {
    resposta: string,
    correta: boolean,
    ordem: number,
    mostrarCorreta: boolean
}
export const AnswerCard: React.FC<IAnswerCard> = ({resposta, correta, ordem, mostrarCorreta}) => {

    return (
        <>
            {((mostrarCorreta && !correta) || !mostrarCorreta) && <div className="flex w-72 h-24 md:h-32  md:w-2/4 md:justify-start bg-white rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-gray-600 rounded-full md:rounded flex items-center justify-center "> {String.fromCharCode(96 + ordem).toUpperCase()}</div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-black">{resposta}</p>
               
            </div>}

            {((mostrarCorreta && correta)) && <div className="flex w-72 h-24 md:h-32 md:w-2/4 md:justify-start bg-green-500 rounded justify-center items-center pl-2">
                <div className="h-12 w-12 bg-white rounded-full md:rounded flex items-center justify-center "><CorrectIcon className="md:mt-2" fill='green'/></div>
                <p className="w-56 pl-1 text-xs md:text-base md:w-full md:h-16 h-14 flex justify-center items-center text-white">{resposta}</p>
               
            </div>}

            
        </>
    )

}