import React, { useEffect, useState } from 'react';
import { NavSlider } from '../shared/components/NavSlider';
import { useLocation } from 'react-router-dom';
import { databaseFirebase } from '../App';
import { doc, getDoc } from 'firebase/firestore';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { QuizAdminLobbyScreen } from './QuizAdminLobbyScreen';
import { QuizAdminQuestScreen } from './QuizAdminQuestScreen';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

export interface IUsersInfo {
    nome: string,
    numeroSala: number,
    color: string,
    respostas: { resposta: number }[]
    corretas?: number
}


export interface IResponse {
    status: boolean,
    mensagem: string
}


const socket = io(process.env.REACT_APP_API_SOCKET_IO ?? '')

export const QuizAdminScreen: React.FC = () => {

    const location = useLocation();
    const [titulo, setTitulo] = useState<string>('')
    const [questoes, setQuestoes] = useState<IQuestao[]>([])
    const [roomNumber, setRoomNumber] = useState<string>('')
    const [iniciar, setIniciar] = useState<boolean>(false)
    const [usersInfo, setUsersInfo] = useState<IUsersInfo[]>([])
    const [trilhaId, setTrilhaId] = useState<string>()

    useEffect(() => {
        if (location.state) {
            getTrilha()
            createRoom()
        }
    }, [])

    const getTrilha = async () => {
        const documentRef = doc(databaseFirebase, "trilhas", location.state)
        const trilhaFirebase = await getDoc(documentRef)
        setTrilhaId(location.state)
        if (trilhaFirebase.exists()) {
            let trilha = trilhaFirebase.data()
            setTitulo(trilha.titulo)
            setQuestoes(trilha.questoes)
        }
    }

    const createRoom = () => {
        const sala = Math.floor(100000 + Math.random() * 900000);
        setRoomNumber(String(sala))
        socket.emit('createRoom', sala, (response: IResponse) => {
            if (response.status) {
                toast.success(response.mensagem)
            }
        });
    }

    const changeQuestion = (questaoAtiva : number) => {
        const updateUserInfo : IUsersInfo[] = usersInfo.map(user => {
            if (!user.respostas[questaoAtiva]) {
                return { ...user, resposta: user.respostas.push({resposta:10}) };
            }
            return user;
        });
        setUsersInfo(updateUserInfo)
    }

    socket.on('usersInRoom', (usersInRoom: string) => {
        const parsedUsersInfo: IUsersInfo[] = JSON.parse(usersInRoom);
        setUsersInfo(parsedUsersInfo)
    });

    socket.on('answerQuestionUser', (userInfo: string, respostaUser: string, questaoAtiva: string) => {
        const parsedUsersInfo: IUsersInfo = JSON.parse(userInfo);

        if (parsedUsersInfo) {
            const updateUserInfo : IUsersInfo[] = usersInfo.map(user => {
                if (user.nome === parsedUsersInfo.nome && user.respostas.length < Number(questaoAtiva + 1)) {
                    return { ...user, resposta: user.respostas.push({resposta:Number(respostaUser)}) };
                }
                return user;
            });
            setUsersInfo(updateUserInfo)
        }
    });


    return (
        <>
            <NavSlider />
            <div className="flex flex-col space-y-2 pt-5 justify-start items-center font-bold text-white h-full w-full md:pl-24">
                {!iniciar && <QuizAdminLobbyScreen onChangeIniciar={(valor: boolean) => {
                    setIniciar(valor)
                    socket.emit('startRoom', roomNumber)
                }} roomNumber={Number(roomNumber)} titulo={titulo} usersInfo={usersInfo} />}
                {iniciar && <QuizAdminQuestScreen trilhaId={trilhaId ?? ''} onChangeQuestion={(questaoAtiva: number) => changeQuestion(questaoAtiva)} roomNumber={roomNumber} socket={socket} questoes={questoes} usersInfo={usersInfo} onChangePoints={(usuarios) => setUsersInfo(usuarios)} />}

            </div>
        </>
    )

}