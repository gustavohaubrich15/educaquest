import React from 'react';

export interface ITrilhaCard {
    id: string,
    titulo: string,
    descricao: string,
    numeroPerguntas: number
    onEdit : (id: string) => void
    onIniciarQuiz : (id: string) => void
}
export const TrilhaCard: React.FC<ITrilhaCard> = ({id, titulo, descricao, numeroPerguntas, onEdit, onIniciarQuiz}) => {

    return (
        <>
            <div className="flex flex-col rounded-lg bg-slate-400 opacity-80 w-56 h-44 scale-75 hover:scale-100 ease-in duration-300">
                <div className="font-bold text-white opacity-100 flex justify-center pt-2 flex-col items-center">
                    <div className="overflow-hidden h-6 text-ellipsis text-center">{titulo}</div>
                    <div className="w-2/3 h-1 bg-white rounded-sm"></div>
                </div>
                <div className="text-xs font-thin pt-3 text-justify pl-2 pr-2">
                    <p className="w-48 overflow-hidden  text-ellipsis">{descricao}</p>
                </div>
                <div className="text-sm font-semibold pt-2 pl-2 ">
                    {numeroPerguntas} Perguntas
                </div>
                <div className="h-full w-full flex flex-col justify-end">
                <div className="pl-5 pr-5 pb-2 flex justify-between ">
                    <div onClick={()=>{onEdit(id)}} className="bg-white w-14 h-7 rounded-lg text-black text-base hover:bg-gray-300 justify-center items-center cursor-pointer hidden md:flex">Editar</div>
                    <div onClick={()=>{onIniciarQuiz(id)}} className="bg-white w-28 h-7 rounded-lg text-black text-base hover:bg-gray-300 flex justify-center items-center cursor-pointer">Iniciar Quiz</div>
                </div>
                </div>
                
            </div>
        </>
    )

}