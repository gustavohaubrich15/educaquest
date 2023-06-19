import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavSlider } from '../shared/components/NavSlider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { databaseFirebase } from '../App';
import { ITrilha } from './TrilhaScreen';
import { UsuarioLogadoContext } from '../shared/context/UsuarioLogadoContext';
import { IUsersInfo } from './QuizAdminScreen';
import { FilterSelect, IFilterSelectOption } from '../shared/components/FilterSelect';
import { ChartBarTotalTrilha } from '../shared/components/ChartBarTotalTrilha';
import { ChartRadarTrilha } from '../shared/components/ChartRadarTrilha';



export interface IQuizRealizado {
    id: string
    trilhaId: string,
    usuariosRanking: IUsersInfo[]
}

export const EstatisticasScreen: React.FC = () => {

    const navigate = useNavigate()
    const { usuarioLogado } = useContext(UsuarioLogadoContext)
    const [trilhas, setTrilhas] = useState<ITrilha[]>([])
    const [quizRealizado, setQuizRealizado] = useState<IQuizRealizado[]>([])
    const [mappedOptionTrilha, setMappedOptionTrilha] = useState<IFilterSelectOption[]>([])
    const [mappedOptionAluno, setMappedOptionAluno] = useState<IFilterSelectOption[]>([])
    const [trilhasFiltered, setTrilhasFiltered] = useState<string[]>([])
    const [alunosFiltered, setAlunosFiltered] = useState<string[]>([])

    useEffect(() => {
        getTrilhasFirebase()
        getQuizRealizadoFirebase()
    }, [])

    useEffect(() => {
        mappedFilterOptionsAluno()
    }, [quizRealizado])

    useEffect(() => {
        mappedFilterOptionsTrilha()
    }, [trilhas])

    const getTrilhasFirebase = async () => {
        const consulta = query(collection(databaseFirebase, 'trilhas'), where("usuarioId", "==", usuarioLogado?.uid))
        const trilhasFirebase = await getDocs(consulta)
        let newTrilhas: ITrilha[] = []
        trilhasFirebase.forEach((doc) => {
            newTrilhas.push({ id: doc.id, ...doc.data() } as ITrilha)
        })
        setTrilhas(newTrilhas)
    }

    const getQuizRealizadoFirebase = async () => {
        const consulta = query(collection(databaseFirebase, 'quizRealizado'), where("usuarioId", "==", usuarioLogado?.uid))
        const quizRealizadoFirebase = await getDocs(consulta)
        let newQuizRealizado: IQuizRealizado[] = []
        quizRealizadoFirebase.forEach((doc) => {
            newQuizRealizado.push({ id: doc.id, ...doc.data() } as IQuizRealizado)
        })
        setQuizRealizado(newQuizRealizado)
    }

    const mappedFilterOptionsTrilha = () => {
        let mappedOption: IFilterSelectOption[] = []

        trilhas.forEach((trilha) => {
            mappedOption.push({ label: trilha.titulo, value: trilha.id })
        })

        setMappedOptionTrilha(mappedOption)
    }

    const mappedFilterOptionsAluno = () => {
        let mappedOption: IFilterSelectOption[] = []

        quizRealizado.forEach((quiz) => {
            quiz.usuariosRanking.forEach((usuario) => {
                let usuarioExiste = mappedOption.filter((option) => {
                    return option.label === usuario.nome
                })
                if (usuarioExiste.length < 1) {
                    mappedOption.push({ label: usuario.nome, value: usuario.nome })
                }
            })
        })

        setMappedOptionAluno(mappedOption)
    }

    return (
        <>
            <NavSlider />
            <div className="flex flex-col space-y-1 pt-5 justify-start items-center font-bold text-white h-full w-full md:pl-24">
                ESTATÍSTICAS
                <div className="hidden md:flex space-x-5 pt-5 justify-start items-start text-lg font-bold w-full md:pl-40">

                    <div>
                        <FilterSelect title={"Filtre por trilha"} titleAll={"Todas trilhas selecionadas"} options={mappedOptionTrilha}
                            onChangeSelected={(options: IFilterSelectOption[]) => {
                                let newFilter: string[] = []
                                options.forEach((option) => {
                                    newFilter.push(option.value)
                                })
                                setTrilhasFiltered(newFilter)
                            }} />
                    </div>
                    <div>
                        <FilterSelect title={"Filtre por Aluno"} titleAll={"Todos alunos selecionados"} options={mappedOptionAluno}
                            onChangeSelected={(options: IFilterSelectOption[]) => {
                                let newFilter: string[] = []
                                options.forEach((option) => {
                                    newFilter.push(option.value)
                                })
                                setAlunosFiltered(newFilter)
                            }} />
                    </div>
                </div>

                <div className="max-h-full max-w-full flex-wrap pt-10 md:flex hidden">
                    <ChartBarTotalTrilha trilhas={trilhas} alunosFiltered={alunosFiltered} quizRealizado={quizRealizado} trilhasFiltered={trilhasFiltered} />
                    
                </div>

                <div className="md:hidden flex justify-center items-center h-full px-10 text-center">
                            Para acessar as estatísticas utilize um computador....
                </div>

            </div>
        </>
    )

}