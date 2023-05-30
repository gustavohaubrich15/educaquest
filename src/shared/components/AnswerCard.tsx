import React from 'react';

export interface IAnswerCard {
    resposta: string,
    correta: boolean,
    ordem: number
}
export const AnswerCard: React.FC<IAnswerCard> = ({resposta, correta, ordem}) => {

    return (
        <>
            <div className="flex w-72 h-16 bg-white rounded-e justify-center items-center pl-2">
                <div className="h-12 w-12 bg-gray-600 rounded-full flex items-center justify-center "> {String.fromCharCode(96 + ordem).toUpperCase()}</div>
                <p className="w-56 pl-1 text-xs  text-black">{resposta}</p>
            </div>
        </>
    )

}