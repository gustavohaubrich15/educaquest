import React from 'react';
import { ReactComponent as UserIcon } from '../images/user.svg'

export interface IUserCount {
    contador: number
}
export const UserCount: React.FC<IUserCount> = ({contador}) => {

    return (
        <>
            <div className='md:h-14 md:w-32  flex items-center pt-10 md:pt-0 flex-col md:flex-row'>
                <UserIcon className="md:h-12 md:w-12 h-32 w-32 "/>
                <div className="md:text-3xl text-lg items-center flex-col flex"><div className="flex md:hidden ">Usuários conectados</div>{contador}</div>
            </div>
        </>
    )

}