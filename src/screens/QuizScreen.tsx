import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { LobbyQuiz } from '../shared/components/LobbyQuiz';
import { LobbyQuizWaiting } from '../shared/components/LobbyQuizWaiting';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { AnswerCardButton } from '../shared/components/AnswerCardButton';
import { QuestionQuiz } from '../shared/components/QuestionQuiz';
import { toast } from 'react-toastify';
import { IResponse, IUsersInfo } from './QuizAdminScreen';


const socket = io(process.env.REACT_APP_API_SOCKET_IO ?? '')
export const QuizScreen: React.FC = () => {

    const [codigoSala, setCodigoSala] = useState<string>('')
    const [entrouNaSala, setEntrouNaSala] = useState<boolean>(false)
    const [iniciarPergunta, setIniciarPergunta] = useState<boolean>(false)
    const [questao, setQuestao] = useState<IQuestao>()
    const [loading, setLoading] = useState<boolean>(false)
    const [mostrarCorreta, setMostrarCorreta] = useState<boolean>(false)
    const [respostaCorreta, setRespostaCorreta] = useState<number>(0)
    const [questaoAtiva, setQuestaoAtiva] = useState<string>('')
    const [onlineUsers, setOnlineUsers] = useState<number>(0)

    const entrarNaSala = (userInfo: IUsersInfo, codigoSalaEmit: string) => {
        socket.emit('joinRoom', codigoSalaEmit, userInfo, (response: IResponse) => {
            if (!response.status) {
                toast.error(response.mensagem)
            } else {
                setEntrouNaSala(true)
                setCodigoSala(codigoSala)
            }
        });
    }

    socket.on('nextQuestion', (nextQuestao: string, questaoAtiva: string) => {
        setQuestaoAtiva(questaoAtiva)
        setLoading(true)
        setMostrarCorreta(false)
        setTimeout(() => { setLoading(false) }, 10);
        const parsedUsersInfo: IQuestao = JSON.parse(nextQuestao);
        setQuestao(parsedUsersInfo)
        setIniciarPergunta(true)
    })


    socket.on('showCorrectQuestion', (correta: string) => {
        setRespostaCorreta(Number(correta))
        setMostrarCorreta(true)
    })

    socket.on('usersInRoomOnline', (users: string) => {
        setOnlineUsers(Number(users))
    })


    return (
        <>
            {!entrouNaSala && <LobbyQuiz entrarNaSalaEmit={(userInfo: IUsersInfo, codigoSalaEmit: string) => entrarNaSala(userInfo, codigoSalaEmit)} onChangeCodigoSala={setCodigoSala} onChangeEntrouNaSala={(entrou: boolean) => { setEntrouNaSala(entrou) }} />}

            {entrouNaSala && !iniciarPergunta && <LobbyQuizWaiting onlineUsers={onlineUsers} />}

            {entrouNaSala && iniciarPergunta && !loading && <QuestionQuiz onChangeResposta={(resposta: number) => {
                
                if (resposta > 0) {
                    socket.emit('answerQuestion', codigoSala, resposta, questaoAtiva)
                    console.log('chamou resposta')
                }
            }} mostrarCorreta={mostrarCorreta} respostaCorreta={respostaCorreta} questao={questao} />}
        </>
    )

}