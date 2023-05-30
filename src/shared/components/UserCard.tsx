import React from 'react';
import { ReactComponent as CellPhoneIcon } from '../images/cellphone.svg'

export interface IUserCard {
    nome: string,
    color: string
}
export const UserCard: React.FC<IUserCard> = ({nome, color}) => {

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-3">
                <CellPhoneIcon fill={color}/>
                <div className=""><div className={`bg-${color}-500 rounded px-2`}>{nome}</div></div>
            </div>
        </>
    )

}