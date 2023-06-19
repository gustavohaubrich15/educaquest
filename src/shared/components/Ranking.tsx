import React from 'react';
import { RankingCard } from './RankingCard';
import { IUsersInfo } from '../../screens/QuizAdminScreen';
import { IQuestao } from './EditQuestaoCard';
import { rankingUsers } from '../utils/sortedUsers';

interface IRanking {
    usersInfo: IUsersInfo[],
    questoes: IQuestao[],
    questaoAtiva: number
}
export const Ranking: React.FC<IRanking> = ({ usersInfo, questoes, questaoAtiva }) => {

    const sortedUsers = rankingUsers(usersInfo,questoes)

    return (
        <>
            <div className="md:flex md:justify-evenly md:flex-wrap md:w-[50%] md:space-y-4 md:items-start overflow-auto w-[85%]  h-[410%]" style={{
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
                    return <RankingCard usuario={usuario} key={index} index={index} questaoAtiva={questaoAtiva} questoes={questoes} />
                })}
            </div>
        </>
    )

}