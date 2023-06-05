import React, { useEffect, useState, useContext } from 'react';
import { NavSlider } from '../shared/components/NavSlider';
import { useLocation } from 'react-router-dom';
import { databaseFirebase } from '../App';
import { doc, getDoc } from 'firebase/firestore';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { QuizAdminLobbyScreen } from './QuizAdminLobbyScreen';
import { QuizAdminQuestScreen } from './QuizAdminQuestScreen';

export interface IUsersInfo {
    nome: string,
    numeroSala: number,
    color: string,
    respostas: { resposta: number }[]
    corretas?: number
}

export const QuizAdminScreen: React.FC = () => {
    const location = useLocation();
    const [titulo, setTitulo] = useState<string>('')
    const [questoes, setQuestoes] = useState<IQuestao[]>([])
    const [roomNumber, setRoomNumber] = useState<number>(0)
    const [iniciar, setIniciar] = useState<boolean>(false)
    const [usersInfo, setUsersInfo] = useState<IUsersInfo[]>([
        {
            nome: 'gustavo',
            color: 'green',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 2
                }
            ]
        },
        {
            nome: 'João pedro',
            color: 'red',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 3
                }
            ]
        },
        {
            nome: 'Martin',
            color: 'blue',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 5
                }
            ]
        },
        {
            nome: 'José',
            color: 'purple',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 5
                },
                {
                    resposta: 3
                }
            ]
        },
        {
            nome: 'Marcelo',
            color: 'yellow',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 1
                },
                {
                    resposta: 3
                }
            ]
        },
        {
            nome: 'Vagner',
            color: 'purple',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 5
                },
                {
                    resposta: 3
                }
            ]
        },
        {
            nome: 'Ruan',
            color: 'blue',
            numeroSala: roomNumber,
            respostas: [
                {
                    resposta: 5
                },
                {
                    resposta: 3
                }
            ]
        }

    ])

    useEffect(() => {
        if (location.state) {
            getTrilha()
            createRoom()
        }
    }, [])

    const getTrilha = async () => {
        const documentRef = doc(databaseFirebase, "trilhas", location.state)
        const trilhaFirebase = await getDoc(documentRef)

        if (trilhaFirebase.exists()) {
            let trilha = trilhaFirebase.data()
            setTitulo(trilha.titulo)
            setQuestoes(trilha.questoes)
        }
    }

    const createRoom = () => {
        const sala = Math.floor(100000 + Math.random() * 900000);
        setRoomNumber(sala)
    }

    return (
        <>
            <NavSlider />
            <div className="flex flex-col space-y-2 pt-5 justify-start items-center font-bold text-white h-full w-full md:pl-24">
                {!iniciar && <QuizAdminLobbyScreen onChangeIniciar={(valor: boolean) => setIniciar(valor)} roomNumber={roomNumber} titulo={titulo} usersInfo={usersInfo} />}
                {iniciar && <QuizAdminQuestScreen questoes={questoes} usersInfo={usersInfo} onChangePoints={(usuarios)=>setUsersInfo(usuarios)} />}

            </div>
        </>
    )

}