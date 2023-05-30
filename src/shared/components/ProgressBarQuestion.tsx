import React, {useState, useEffect} from 'react';
import { IQuestao } from './EditQuestaoCard';

interface IProgressBarQuestion {
    questoes: IQuestao[],
    ativa: number
}
export const ProgressBarQuestion: React.FC<IProgressBarQuestion> = ({questoes, ativa}) => {

    const [classBar, setClassBar] = useState<string>()

    useEffect(()=>{
        let valor = (210*(ativa+1))/(questoes.length)
        setClassBar(String(valor))
    },[])

    return (
        <>
            <div className="flex w-4/5 justify-between items-center h-10">
                <div className="w-[210px] h-2 rounded bg-white">
                    {classBar !== '' && <div className="bg-green-500 h-2 rounded" style={{width:`${classBar}px`}}></div>}
                </div>
                <div>{`${ativa+1}/${questoes.length}`}</div>
            </div>
        </>
    )

}