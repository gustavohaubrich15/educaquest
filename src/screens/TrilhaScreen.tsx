import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavSlider } from '../shared/components/NavSlider';
import { Button } from '../shared/components/Button';
import { EditQuestaoCard } from '../shared/components/EditQuestaoCard';
import { IQuestaoCard, QuestaoCard } from '../shared/components/QuestaoCard';

export const TrilhaScreen: React.FC = () => {

    const navigate = useNavigate()
    const [titulo, setTitulo] = useState<string>('')
    const [questoes, setQuestoes] = useState<IQuestaoCard[]>([
        { pergunta: 'Qual a capital da austrália?', numeroAlternativas: 4 }, { pergunta: 'Qual a capital do equador?', numeroAlternativas: 3 }
    ])
    const [paginateFrom, setPaginateFrom] = useState(0)
    const [paginateTo, setPaginateTo] = useState(3)

    const PaginaAnterior = () => {

        setPaginateFrom((prevValue) => prevValue - 3)
        setPaginateTo((prevValue) => prevValue - 3)
    };

    const ProximaPagina = () => {
        setPaginateFrom((prevValue) => prevValue + 3)
        setPaginateTo((prevValue) => prevValue + 3)
    };

    return (
        <>
            <NavSlider />
            <div className="flex space-x-2 justify-center items-center pl-32">
                <EditQuestaoCard />

                <div className="flex flex-col space-y-5 w-[55vw] h-screen">
                    <div className="flex space-x-5 pt-5 justify-center items-center text-lg font-bold">
                        <div className="flex flex-col">
                            <label className="block  tracking-wide text-gray-700 ">
                                Título da trilha
                            </label>
                            <input value={titulo} onChange={(e) => { setTitulo(e.target.value) }} className="appearance-none block w-72 bg-gray-200 text-gray-700 border border-black rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite o título da trilha" />
                        </div>
                        <div>
                            Número de questões : {questoes.length}
                        </div>
                    </div>

                    <div className=" flex flex-col bg-slate-200 space-y-2 pt-5 justify-center items-center font-bold text-white   flex-wrap">

                        <div className=" flex-row  flex flex-wrap justify-center space-x-5">
                            {questoes.slice(paginateFrom, paginateTo).map((questao, index) => {
                                return <QuestaoCard
                                    key={index}
                                    pergunta={questao.pergunta}
                                    numeroAlternativas={questao.numeroAlternativas}
                                />
                            })}
                        </div>

                        <div className=" w-full flex justify-center pb-2 space-x-2">
                            {paginateTo > 3 && <Button descricao="< Anterior" onClick={PaginaAnterior} />}
                            {questoes.length > paginateTo && <Button descricao="Próxima >" onClick={ProximaPagina} />}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}