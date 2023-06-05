import React, { useState, useEffect } from 'react';
import { Button } from '../shared/components/Button';
import { ProgressBarQuestion } from '../shared/components/ProgressBarQuestion';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { AnswerCard } from '../shared/components/AnswerCard';
import { Ranking } from '../shared/components/Ranking';
import { IUsersInfo } from './QuizAdminScreen';

export interface IQuizAdminQuestScreen {
    questoes: IQuestao[],
    usersInfo: IUsersInfo[],
    onChangePoints: (usuarios: IUsersInfo[]) => void
}

export const QuizAdminQuestScreen: React.FC<IQuizAdminQuestScreen> = ({ questoes, usersInfo, onChangePoints }) => {

    const [questaoAtiva, setQuestaoAtiva] = useState<number>(0)
    const [exibirCorreta, setExibirCorreta] = useState<boolean>(false)
    const [exibirRanking, setExibirRanking] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{

        let corretas : number[] = []

        questoes.forEach((questao)=>{
            corretas.push(questao.alternativas.findIndex(alternativa => alternativa.correta === true) + 1)
        })
        
        let calculatedPoints = usersInfo.map((usuario)=>{
            
            return {
                ...usuario,
                corretas : usuario.respostas.filter((resposta, index)=> resposta.resposta == corretas[index] && index<= questaoAtiva).length 
            }
        })
        onChangePoints(calculatedPoints)
    },[exibirRanking])


    return (
        <>
            {!loading && !exibirRanking && questoes.length > questaoAtiva && <ProgressBarQuestion questoes={questoes} ativa={questaoAtiva} />}
            {!loading && !exibirRanking && questoes[questaoAtiva] !== undefined && <div className="h-18 text-gray-700 pb-6 leading-tight font-semibold md:text-3xl w-3/4 justify-center flex text-center" >
                {questoes[questaoAtiva].pergunta}
            </div>}
            {
                !loading && !exibirRanking && questoes[questaoAtiva] !== undefined && questoes[questaoAtiva].alternativas.map((alternativa, index) => {
                    return <>
                        <AnswerCard key={index} ordem={alternativa.ordem} resposta={alternativa.resposta} correta={alternativa.correta} mostrarCorreta={exibirCorreta} />
                    </>
                })
            }

            {
                !loading && exibirRanking && <Ranking usersInfo={usersInfo} questoes={questoes} questaoAtiva={questaoAtiva}/>
            }

            <div className="h-full flex items-end md:pb-10 space-x-2 flex-wrap pb-2">
                {!exibirRanking && <Button onClick={() => setExibirCorreta(true)} descricao="Exibir Correta" />}
                {exibirRanking && <Button onClick={() => setExibirRanking(false)} descricao="Voltar" />}
                {!exibirRanking && <Button onClick={() => setExibirRanking(true)} descricao="Exibir Ranking" />}
                {questoes.length - 1 > questaoAtiva && <Button onClick={() => {
                    let proxima = questaoAtiva + 1
                    setQuestaoAtiva(proxima)
                    console.log(questaoAtiva)
                    setLoading(true)
                    setTimeout(() => { setLoading(false) }, 10);
                    setExibirCorreta(false)
                    setExibirRanking(false)
                }} descricao="Próxima pergunta" />}
            </div>
        </>
    )

}