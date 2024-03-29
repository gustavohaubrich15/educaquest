import React, {useContext, useState} from 'react';
import { RankingCard } from './RankingCard';
import { IUsersInfo } from '../../screens/QuizAdminScreen';
import { IQuestao } from './EditQuestaoCard';
import { WinnerCard } from './WinnerCard';
import Confetti from 'react-confetti'
import { Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { addDoc, collection } from "firebase/firestore";
import { databaseFirebase } from '../../App'
import { UsuarioLogadoContext } from '../context/UsuarioLogadoContext';
import { rankingUsers } from '../utils/sortedUsers';


interface IRankingFinal {
    usersInfo: IUsersInfo[],
    questoes: IQuestao[],
    socket : Socket,
    roomNumber: string,
    trilhaId: string
}
export const RankingFinal: React.FC<IRankingFinal> = ({ usersInfo, questoes, socket, roomNumber, trilhaId }) => {
    const { usuarioLogado } = useContext(UsuarioLogadoContext)
    const [adicionadoEstatistica, setAdicionadoEstatistica] = useState<boolean>(false)
    
    const sortedUsers = rankingUsers(usersInfo,questoes)

    
    const adicionarEstatistica = async() =>{
        try {

            let usuarioId = usuarioLogado?.uid

            await addDoc(collection(databaseFirebase, "quizRealizado"), {
                usuarioId: usuarioId,
                trilhaId: trilhaId,
                usuariosRanking: sortedUsers
            });
            toast.success('Quiz Finalizado');
        } catch (error) {
            toast.error('Erro ao finalizar quiz.');
        }
    }

    if(sortedUsers && !adicionadoEstatistica){
        setAdicionadoEstatistica(true)
        socket.emit('finishQuiz', roomNumber, sortedUsers)
        adicionarEstatistica()
    }

    return (
        <>  
            <Confetti style={{width:'100%'}}  />
            <div className="md:w-[80%] md:h-[70%] flex pt-2 pb-2 justify-center">
                {sortedUsers.length > 0 && sortedUsers.slice(0,3).map((usuario, index) => {
                    return <WinnerCard usuario={usuario} key={index} index={index} questoes={questoes} />
                })}
                
            </div>
            <div className="md:flex md:justify-center md:flex-wrap md:w-[90%] md:space-x-5 md:items-start overflow-auto w-[85%]  h-[410%]" style={{
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(155, 155, 155, 0.5) rgba(0, 0, 0, 0.1)',
            }}
            >
                <style>
                    {`
                    ::-webkit-scrollbar {
                    width: 8px;
                    }
                    
                    ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    }
                    
                    ::-webkit-scrollbar-thumb {
                    background-color: rgba(155, 155, 155, 0.5);
                    border-radius: 4px;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(155, 155, 155, 0.7);
                    }
                    `}
                </style>
                {sortedUsers.map((usuario, index) => {
                    if (index > 2) {
                        return <RankingCard usuario={usuario} key={index} index={index} questaoAtiva={questoes.length -1} questoes={questoes} />
                    }
                    return
                })}
            </div>
        </>
    )

}