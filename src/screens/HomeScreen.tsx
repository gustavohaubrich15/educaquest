import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavSlider } from '../shared/components/NavSlider';
import { ITrilhaCard, TrilhaCard } from '../shared/components/TrilhaCard';
import { Search } from '../shared/components/Search';
import { Button } from '../shared/components/Button';
import { databaseFirebase } from '../App';
import { UsuarioLogadoContext } from '../shared/context/UsuarioLogadoContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ITrilha } from './TrilhaScreen';

export const HomeScreen: React.FC = () => {

    const navigate = useNavigate()
    const { usuarioLogado } = useContext(UsuarioLogadoContext)
    const [search, setSearch] = useState<string>('')
    const [trilhasFiltered, setTrilhasFiltered] = useState<ITrilhaCard[]>([])
    const [trilhas, setTrilhas] = useState<ITrilha[]>([])
    const [paginateFrom, setPaginateFrom] = useState(0)
    const [paginateTo, setPaginateTo] = useState(3)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        getTrilhasFirebase()
    }, [])

    const getTrilhasFirebase = async () => {
        const consulta = query(collection(databaseFirebase, 'trilhas'), where("usuarioId", "==", usuarioLogado?.uid))
        const trilhasFirebase = await getDocs(consulta)
        const newTrilhas: ITrilha[] = []
        trilhasFirebase.forEach((doc) => {
            newTrilhas.push({ id: doc.id, ...doc.data() } as ITrilha)
        })
        setTrilhas(newTrilhas)
    }

    useEffect(() => {
        const media = window.matchMedia('(max-width: 700px)');
        if (media.matches !== isMobile) {
            setIsMobile(media.matches);
            setPaginateTo(media.matches ? 3 : 10)
        }
        const listener = () => {
            setIsMobile(media.matches)
            setPaginateTo(media.matches ? 3 : 10)
        };
        window.addEventListener("resize", listener);

        return () => window.removeEventListener("resize", listener);
    }, [isMobile]);


    useEffect(() => {
        let filtrarTrilhas = trilhas.filter((trilha) => {
            return trilha.titulo.toLowerCase().includes(search.toLocaleLowerCase()) || trilha.descricao.toLowerCase().includes(search.toLocaleLowerCase()) || search === ''
        })
        setTrilhasFiltered(filtrarTrilhas.map((trilha) => {
            return {
                id: trilha.id,
                titulo: trilha.titulo,
                descricao: trilha.descricao,
                numeroPerguntas: trilha.questoes.length,
                onEdit: () => {},
            }
        }))
        setPaginateFrom(0)
        setPaginateTo(isMobile ? 3 : 10)
    }, [search, trilhas])

    const PaginaAnterior = () => {

        setPaginateFrom((prevValue) => prevValue - (isMobile ? 3 : 10))
        setPaginateTo((prevValue) => prevValue - (isMobile ? 3 : 10))
    };

    const ProximaPagina = () => {
        setPaginateFrom((prevValue) => prevValue + (isMobile ? 3 : 10))
        setPaginateTo((prevValue) => prevValue + (isMobile ? 3 : 10))
    };

    return (
        <>
            <NavSlider />
            <div className="flex flex-col space-y-2 pt-5 justify-start items-center font-bold text-white h-full w-full md:pl-24">
                <div className="md:flex md:space-x-2 hidden">
                    <Search onChangeSearch={(valor) => { setSearch(valor) }} />
                    <Button onClick={() => { navigate('/trilhas') }} descricao="Nova Trilha" />
                </div>
                <div className="flex md:hidden">
                    <Search onChangeSearch={(valor) => { setSearch(valor) }} />
                </div>
                <div className=" md:flex-row md:w-full md:flex md:flex-wrap md:justify-center">
                    {trilhasFiltered.slice(paginateFrom, paginateTo).map((trilha, index) => {
                        return <TrilhaCard
                            key={index}
                            id={trilha.id}
                            titulo={trilha.titulo}
                            descricao={trilha.descricao}
                            numeroPerguntas={trilha.numeroPerguntas}
                            onEdit={(id: string)=>{
                                console.log(id)
                                navigate('/trilhas', { state: id })
                            }}
                            />
                    })}
                </div>

                <div className=" w-full flex justify-center pb-2 space-x-2">
                    {paginateTo > (isMobile ? 3 : 10) && <Button descricao="< Anterior" onClick={PaginaAnterior} />}
                    {trilhasFiltered.length > paginateTo && <Button descricao="Próxima >" onClick={ProximaPagina} />}
                </div>

            </div>
        </>
    )

}