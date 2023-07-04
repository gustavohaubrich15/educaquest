import React from 'react';
import { ReactComponent as Origami } from '../images/origami.svg'
import { UserCount } from './UserCount';

interface ILobbyQuizWaiting {
    onlineUsers: number
}
export const LobbyQuizWaiting: React.FC<ILobbyQuizWaiting> = ({ onlineUsers }) => {

    

    return (
        <>
            <div className="flex flex-col space-y-14 pb-14  justify-center items-center font-bold text-white h-full w-full ">
                <UserCount contador={onlineUsers} />
                <div className="text-lg font-bold uppercase">Aguardando início.....</div>
                <Origami className=" animate-bounce w-10 h-10 md:w-14 md:h-14" />
            </div>
        </>
    )

}