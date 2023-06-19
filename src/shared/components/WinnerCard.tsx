import React from 'react';
import { ReactComponent as CellPhoneIcon } from '../images/cellphone.svg'
import { IUsersInfo } from '../../screens/QuizAdminScreen';
import { IQuestao } from './EditQuestaoCard';
import { scoreUser } from '../utils/scoreUser';

export interface IWinnerCard {
    usuario: IUsersInfo,
    index: number,
    questoes: IQuestao[]
}
export const WinnerCard: React.FC<IWinnerCard> = ({ usuario, index, questoes }) => {



    return (
        <>
            <div className="flex space-x-2  flex-col justify-center items-center space-y-2">
                <CellPhoneIcon className="h-16 w-16 md:h-24 md:w-24" fill={usuario.color} />
                <div>{usuario.nome.toUpperCase()}</div>
                <div className="hidden justify-between md:flex">
                    <div>{` ${usuario.corretas} Acertos`}</div>
                </div>
                <div className="hidden justify-between md:flex">
                    <div>{` ${scoreUser(usuario, questoes)} Pontos`}</div>
                </div>
                { index===0 &&<div style={{backgroundColor:'gold'}} className={`h-16 w-16 md:h-28 md:w-28 rounded-md items-center flex justify-center`}>
                    <div className="text-1xl md:text-5xl ">{index + 1}º</div>
                </div>}
                { index===1 &&<div style={{backgroundColor:'silver'}} className={`h-14 w-14 md:h-24 md:w-24 bg-slate-800 rounded-md items-center flex justify-center`}>
                    <div className="text-1xl md:text-5xl ">{index + 1}º</div>
                </div>}
                { index===2 &&<div style={{backgroundColor:'#cd7f32'}} className={`h-12 w-12 md:h-20 md:w-20 bg-slate-800 rounded-md items-center flex justify-center`}>
                    <div className="text-1xl md:text-5xl ">{index + 1}º</div>
                </div>}
            </div>
        </>
    )

}