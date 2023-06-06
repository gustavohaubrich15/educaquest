import React, { useEffect, useState } from 'react';
import { RankingCard } from './RankingCard';
import { IUsersInfo } from '../../screens/QuizAdminScreen';
import { IQuestao } from './EditQuestaoCard';
import { WinnerCard } from './WinnerCard';
import Confetti from 'react-confetti'


interface IRankingFinal {
    usersInfo: IUsersInfo[],
    questoes: IQuestao[]
}
export const RankingFinal: React.FC<IRankingFinal> = ({ usersInfo, questoes }) => {

    const sortedUsers = usersInfo.sort((a, b) => {
        const aCorrectAnswers = a.respostas.filter((resposta, index) => {
            return questoes[index].alternativas.findIndex(alternativa => alternativa.correta === true) === resposta.resposta - 1
        }).length
        const bCorrectAnswers = b.respostas.filter((resposta, index) => {
            return questoes[index].alternativas.findIndex(alternativa => alternativa.correta === true) === resposta.resposta - 1
        }).length

        return bCorrectAnswers - aCorrectAnswers;
    });


    return (
        <>  
            <Confetti/>
            <div className="md:w-[80%] md:h-[70%] flex pt-2 pb-2 justify-center">
                {sortedUsers.length > 0 && sortedUsers.slice(0,3).map((usuario, index) => {
                    return <WinnerCard usuario={usuario} key={index} index={index} />
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
                        return <RankingCard usuario={usuario} key={index} index={index} questaoAtiva={questoes.length -1} />
                    }
                    return
                })}
            </div>
        </>
    )

}