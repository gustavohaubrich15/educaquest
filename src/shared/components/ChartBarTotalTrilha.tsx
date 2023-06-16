import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ITrilha } from '../../screens/TrilhaScreen';
import { IQuizRealizado } from '../../screens/EstatisticasScreen';

export interface IChartBarTotalTrilha {
    trilhas: ITrilha[],
    quizRealizado: IQuizRealizado[],
    trilhasFiltered: string[]
    alunosFiltered: string[]
}


export const ChartBarTotalTrilha: React.FC<IChartBarTotalTrilha> = ({ trilhas, quizRealizado, alunosFiltered, trilhasFiltered }) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (trilhas.length > 0) {
            let dataChart: any[] = []
            let quizFiltered = quizRealizado

            if(trilhasFiltered.length > 0){
                quizFiltered = quizFiltered.filter((quiz)=>{
                    return trilhasFiltered.includes(quiz.trilhaId)
                })
            }

            quizFiltered.forEach((quiz) => {
                let totalAcertos = 0
                let quizUsuariosFiltered = quiz.usuariosRanking

                if(alunosFiltered.length > 0){
                    quizUsuariosFiltered = quizUsuariosFiltered.filter((usu)=>{
                        return alunosFiltered.includes(usu.nome)
                    })
                }

                quizUsuariosFiltered.forEach((usu) => {
                    totalAcertos += usu.corretas ?? 0
                })
                let trilha = trilhas.filter((tri) => {
                    return tri.id == quiz.trilhaId
                })

                if (trilha.length > 0 && quizUsuariosFiltered.length > 0 && dataChart.length < 3) {
                    dataChart.push({
                        name: trilha[0].titulo,
                        acertos: totalAcertos,
                        maxAcertos: quizUsuariosFiltered.length * trilha[0].questoes.length
                    })
                }
            })
            setData(dataChart)
        }
    }, [trilhas, quizRealizado, alunosFiltered, trilhasFiltered])


    return (
        <>
            {data.length > 0 && <div className="w-[500px] h-72 text-xs flex flex-col justify-center items-center">
                <div>Quantidade de acertos por quiz (Últimos 3 quiz)</div>
                <ResponsiveContainer >
                    <BarChart
                        width={800}
                        height={300}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" />
                        <YAxis  />
                        <Tooltip />
                        <Legend />
                        <Bar name="Acertos" dataKey="acertos" fill="black" />
                        <Bar name="Quantidade máxima de acertos" dataKey="maxAcertos" fill="green" />
                    </BarChart>
                </ResponsiveContainer>
            </div>}
        </>
    )

}