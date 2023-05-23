import React from 'react';

export interface IQuestaoCard {
    pergunta: string,
    numeroAlternativas: number,
    onEditQuestao: () => void
}
export const QuestaoCard: React.FC<IQuestaoCard> = ({ pergunta, numeroAlternativas, onEditQuestao}) => {

    return (
        <>
            <div className="flex flex-col rounded-lg bg-slate-400 opacity-80 w-64 h-56 scale-75   justify-center items-center">
                <div className="h-56 font-bold text-white opacity-100 flex text-center pt-2 flex-col items-center">
                    <p className="w-48 overflow-hidden text-ellipsis">{pergunta}</p>
                </div>
                <div className="text-sm font-semibold pt-2 pl-2 ">
                    {numeroAlternativas} Alternativas
                </div>
                <div className="h-full w-full flex flex-col justify-end pb-5">
                <div className=" flex justify-center ">
                    <div onClick={()=>onEditQuestao()} className="bg-white w-14 h-10 rounded-lg text-black text-base hover:bg-gray-300 flex justify-center items-center cursor-pointer">Editar</div>
                </div>
                </div>
                
            </div>
        </>
    )

}