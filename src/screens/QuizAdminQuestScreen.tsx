import React, { useState, useEffect } from 'react';
import { Button } from '../shared/components/Button';
import { ProgressBarQuestion } from '../shared/components/ProgressBarQuestion';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { AnswerCard } from '../shared/components/AnswerCard';
import { Ranking } from '../shared/components/Ranking';
import { IUsersInfo } from './QuizAdminScreen';
import { RankingFinal } from '../shared/components/RankingFinal';
import { Socket } from 'socket.io-client';


export interface IQuizAdminQuestScreen {
    questoes: IQuestao[],
    usersInfo: IUsersInfo[],
    onChangePoints: (usuarios: IUsersInfo[]) => void,
    socket: Socket,
    roomNumber: string,
    onChangeQuestion: (questaoAtiva: number) => void
}

export const QuizAdminQuestScreen: React.FC<IQuizAdminQuestScreen> = ({ questoes, usersInfo, onChangePoints, socket, roomNumber, onChangeQuestion }) => {

    const [questaoAtiva, setQuestaoAtiva] = useState<number>(0)
    const [exibirCorreta, setExibirCorreta] = useState<boolean>(false)
    const [exibirRanking, setExibirRanking] = useState<boolean>(false)
    const [finalizarQuiz, setFinalizarQuiz] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{

        let corretas : number[] = []

        questoes.forEach((questao)=>{
            corretas.push(questao.alternativas.findIndex(alternativa => alternativa.correta === true) + 1)
        })
        
        let calculatedPoints = usersInfo.map((usuario)=>{
            
            return {
                ...usuario,
                corretas : usuario.respostas.filter((resposta, index)=> resposta.resposta === corretas[index] && index<= questaoAtiva).length 
            }
        })
        onChangePoints(calculatedPoints)
    },[exibirRanking])

    useEffect(()=>{
        socket.emit('startQuestion', roomNumber, questoes[questaoAtiva], questaoAtiva)
    },[])

    return (
        <>
            {!loading && !finalizarQuiz && !exibirRanking && questoes.length > questaoAtiva && <ProgressBarQuestion questoes={questoes} ativa={questaoAtiva} />}
            {!loading && !finalizarQuiz && !exibirRanking && questoes[questaoAtiva] !== undefined && <div className="h-18 text-gray-700 pb-6 leading-tight font-semibold md:text-3xl w-3/4 justify-center flex text-center" >
                {questoes[questaoAtiva].pergunta}
            </div>}
            {
                !loading && !finalizarQuiz && !exibirRanking && questoes[questaoAtiva] !== undefined && questoes[questaoAtiva].alternativas.map((alternativa, index) => {
                    return <>
                        <AnswerCard key={index} ordem={alternativa.ordem} resposta={alternativa.resposta} correta={alternativa.correta} mostrarCorreta={exibirCorreta} />
                    </>
                })
            }

            {
                !loading && exibirRanking && !finalizarQuiz && <Ranking usersInfo={usersInfo} questoes={questoes} questaoAtiva={questaoAtiva}/>
            }

            {
                !loading && finalizarQuiz && !exibirRanking && <RankingFinal usersInfo={usersInfo} questoes={questoes}/>
            }

            <div className="h-full flex items-end md:pb-10 space-x-2 flex-wrap pb-2">
                {!exibirRanking && !finalizarQuiz && <Button onClick={() => {
                    setExibirCorreta(true)
                    socket.emit('showCorrect', roomNumber, questoes[questaoAtiva])
                }} descricao="Exibir Correta" />}
                {exibirRanking && <Button onClick={() => setExibirRanking(false)} descricao="Voltar" />}
                {!exibirRanking && exibirCorreta && !finalizarQuiz && <Button onClick={() => setExibirRanking(true)} descricao="Exibir Ranking" />}
                {questoes.length - 1 > questaoAtiva && exibirCorreta && <Button onClick={() => {
                    onChangeQuestion(questaoAtiva)
                    let proxima = questaoAtiva + 1
                    setQuestaoAtiva(proxima)
                    setLoading(true)
                    setTimeout(() => { setLoading(false) }, 10);
                    setExibirCorreta(false)
                    setExibirRanking(false)
                    socket.emit('startQuestion', roomNumber, questoes[proxima], proxima)
                }} descricao="Próxima pergunta" />}
                {questoes.length - 1 <= questaoAtiva && exibirCorreta && !finalizarQuiz && <Button onClick={() => setFinalizarQuiz(true)} descricao="Finalizar Quiz" />}
            </div>
        </>
    )

}