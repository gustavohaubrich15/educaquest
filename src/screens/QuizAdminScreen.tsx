import React, { useEffect, useState, useContext } from 'react';
import { NavSlider } from '../shared/components/NavSlider';
import { useLocation } from 'react-router-dom';
import { databaseFirebase } from '../App';
import { doc, getDoc } from 'firebase/firestore';
import { IQuestao } from '../shared/components/EditQuestaoCard';
import { Button } from '../shared/components/Button';
import { QuizAdminLobbyScreen } from './QuizAdminLobbyScreen';
import { ProgressBarQuestion } from '../shared/components/ProgressBarQuestion';
import { AnswerCard } from '../shared/components/AnswerCard';

export interface IUsersInfo {
    nome: string,
    numeroSala: number,
    color: string,
    respostas: { resposta: number, tempo: number }[]
}

export const QuizAdminScreen: React.FC = () => {
    const location = useLocation();
    const [titulo, setTitulo] = useState<string>('')
    const [questoes, setQuestoes] = useState<IQuestao[]>([])
    const [questaoAtiva, setQuestaoAtiva] = useState<number>(0)
    const [exibirCorreta, setExibirCorreta] = useState<boolean>(false)
    const [roomNumber, setRoomNumber] = useState<number>(0)
    const [iniciar, setIniciar] = useState<boolean>(true)
    const [usersInfo, setUsersInfo] = useState<IUsersInfo[]>([
        {
            nome: 'gustavo',
            color: 'green',
            numeroSala: roomNumber,
            respostas: []
        },
        {
            nome: 'João pedro',
            color: 'yellow',
            numeroSala: roomNumber,
            respostas: []
        },
        {
            nome: 'Martin',
            color: 'purple',
            numeroSala: roomNumber,
            respostas: []
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
                <div className="text-lg md:leading-10 md:text-1xl pb-5">{titulo}</div>
                <ProgressBarQuestion questoes={questoes} ativa={questaoAtiva} />
                {questoes[questaoAtiva] !== undefined && <div className="h-18 text-gray-700 pb-6 leading-tight font-semibold md:text-3xl" >
                    { questoes[questaoAtiva].pergunta}
                </div>}
                {
                   questoes[questaoAtiva] !== undefined &&  questoes[questaoAtiva].alternativas.map((alternativa, index) => {
                        return <>
                            <AnswerCard key={index} ordem={alternativa.ordem} resposta={alternativa.resposta} correta={alternativa.correta} mostrarCorreta={exibirCorreta} />
                        </>
                    })
                }

                <div className="h-full flex items-end pb-10">
                    <Button onClick={() => setExibirCorreta(true)} descricao="Exibir Correta" />
                </div>

            </div>
        </>
    )

}