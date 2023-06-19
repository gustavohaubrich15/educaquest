import React from 'react';
import { ReactComponent as CellPhoneIcon } from '../images/cellphone.svg'
import { IUsersInfo } from '../../screens/QuizAdminScreen';
import { IQuestao } from './EditQuestaoCard';
import { scoreUser } from '../utils/scoreUser';

export interface IRankingCard {
    usuario: IUsersInfo,
    index: number,
    questaoAtiva: number,
    questoes: IQuestao[]
}
export const RankingCard: React.FC<IRankingCard> = ({ usuario, index, questaoAtiva, questoes }) => {

    const tamanhoAcertos = () => {
        let corretas = usuario.corretas ?? 0

        let tamanho = (corretas * 250) / (questaoAtiva + 1)

        return String(tamanho)
    }

    

    return (
        <>
            <div className="flex space-x-2 justify-start md:space-y-0 space-y-7">
                <div className="text-lg md:text-3xl">{index + 1}º</div>
                <CellPhoneIcon className="h-16 w-16 md:h-20 md:w-20" fill={usuario.color} />
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                        <div>{usuario.nome.toUpperCase()}</div>
                        <div>{scoreUser(usuario, questoes)} pontos</div>
                    </div>
                    <div className="w-[250px] h-2 rounded bg-white hidden md:flex">
                        {<div className="h-2 rounded" style={{ width: `${tamanhoAcertos()}px`, backgroundColor: usuario.color }}></div>}
                    </div>
                    <div className="flex justify-between">
                        <div>{` ${usuario.corretas} Acertos`}</div>
                        <div className="md:flex hidden">{`${usuario.corretas}/ ${questaoAtiva + 1}`}</div>
                    </div>
                </div>
            </div>
        </>
    )

}