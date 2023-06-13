import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AnswerCardButton } from './AnswerCardButton';
import { IQuestao } from './EditQuestaoCard';

interface IQuestionQuiz {
    questao: IQuestao | undefined,
    mostrarCorreta: boolean,
    respostaCorreta: number,
    onChangeResposta: (resposta: number) => void
}
export const QuestionQuiz: React.FC<IQuestionQuiz> = ({  questao, mostrarCorreta, respostaCorreta, onChangeResposta }) => {

    const [resposta, setResposta] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 10);
    }, [resposta, mostrarCorreta, respostaCorreta])



    return (
        <>
            <div className="flex flex-col space-y-1 pt-5 justify-start items-center font-bold text-white h-full w-full md:pl-24">
                <div className="h-18 text-gray-700 pb-6 leading-tight font-semibold text-lg md:text-3xl  w-3/4 justify-center flex text-center" >
                    {questao && questao.pergunta}
                </div>
                {!loading && questao && questao.alternativas.map((alternativa, index) => {
                    return <>
                        <AnswerCardButton key={index} respostaSelected={resposta} onChangeSelected={(respo: number)=>{
                            setResposta(respo)
                            onChangeResposta(respo)
                        }} ordem={alternativa.ordem} resposta={alternativa.resposta} mostrarCorreta={mostrarCorreta} respostaCorreta={respostaCorreta}/>
                    </>
                })
                }
            </div>
        </>
    )

}