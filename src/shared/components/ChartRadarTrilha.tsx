import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ITrilha } from '../../screens/TrilhaScreen';
import { IQuizRealizado } from '../../screens/EstatisticasScreen';

export interface IChartRadarTrilha {
    trilhas: ITrilha[],
    quizRealizado: IQuizRealizado[],
    trilhasFiltered: string[]
    alunosFiltered: string[]
}

export const ChartRadarTrilha: React.FC<IChartRadarTrilha> = ({ trilhas, quizRealizado, alunosFiltered, trilhasFiltered }) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (trilhas.length > 0) {
            let dataChart: any[] = []
            
            let quizFiltered = quizRealizado

            if (trilhasFiltered.length > 0) {
                quizFiltered = quizFiltered.filter((quiz) => {
                    return trilhasFiltered.includes(quiz.trilhaId)
                })
            }

            quizFiltered.forEach((quiz) => {

                let quizUsuariosFiltered = quiz.usuariosRanking

                if (alunosFiltered.length > 0) {
                    quizUsuariosFiltered = quizUsuariosFiltered.filter((usu) => {
                        return alunosFiltered.includes(usu.nome)
                    })
                }

                let trilha = trilhas.filter((tri) => {
                    return tri.id == quiz.trilhaId
                })

                if (trilha.length > 0 && quizUsuariosFiltered.length > 0) {
                   
                }
            })
            
            setData(dataChart)
        }
    }, [trilhas, quizRealizado, alunosFiltered, trilhasFiltered])

    
    return (
        <>
            {data.length > 0 && <div className="w-[500px] h-72 text-xs flex flex-col justify-center items-center">
                <div>Mapa de acertos nas trilhas</div>
                
            </div>}
        </>
    )

}