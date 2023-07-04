import React from 'react';
import { QuizPin } from '../shared/components/QuizPin';
import { Button } from '../shared/components/Button';
import { UserCount } from '../shared/components/UserCount';
import { IUsersInfo } from './QuizAdminScreen';
import { UserCard } from '../shared/components/UserCard';

export interface IQuizAdminLobbyScreen{
    roomNumber: number
    usersInfo: IUsersInfo[],
    titulo: string,
    onChangeIniciar: (valor: boolean) => void
}

export const QuizAdminLobbyScreen: React.FC<IQuizAdminLobbyScreen> = ({roomNumber, titulo, usersInfo, onChangeIniciar}) => {

    return (
        <>  
             <QuizPin roomNumber={roomNumber} />
                <div className="flex md:pt-2 md:flex-row flex-col-reverse space-y-10 md:space-y-0 justify-between items-center">
                    <UserCount contador={usersInfo.length} />
                    <div className="text-lg md:leading-10 md:text-6xl">{titulo}</div>
                </div>
                <div className="h-1"></div>

                <div className="md:flex md:justify-evenly md:flex-wrap md:w-[90%] hidden">
                    {
                       usersInfo !== undefined && usersInfo.map((usuario, index) => {
                            return <>
                                <UserCard key={index} nome={usuario.nome} color={usuario.color} />
                            </>
                        })
                    }
                </div>

                <div className="h-full flex items-end pb-32 md:pb-10">
                     <Button onClick={()=>onChangeIniciar(true)} descricao="Iniciar" />
                </div>
        </>
    )

}