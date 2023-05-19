import React from 'react';

export interface IQuestaoCard {
    pergunta: string,
    numeroAlternativas: number
}
export const QuestaoCard: React.FC<IQuestaoCard> = ({ pergunta, numeroAlternativas}) => {

    return (
        <>
            <div className="flex flex-col rounded-lg bg-slate-400 opacity-80 w-56 h-40 scale-75  justify-center items-center">
                <div className="font-bold text-white opacity-100 flex justify-center pt-2 flex-col items-center">
                    {pergunta}
                </div>
                <div className="text-sm font-semibold pt-2 pl-2 ">
                    {numeroAlternativas} Alternativas
                </div>
                <div className="h-full w-full flex flex-col justify-end pb-5">
                <div className=" flex justify-center ">
                    <div className="bg-white w-14 h-10 rounded-lg text-black text-base hover:bg-gray-300 flex justify-center items-center cursor-pointer">Editar</div>
                </div>
                </div>
                
            </div>
        </>
    )

}