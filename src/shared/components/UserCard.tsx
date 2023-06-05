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
                <div className=""><div className="rounded px-2" style={{backgroundColor:color}}>{nome.toUpperCase()}</div></div>
            </div>
        </>
    )

}