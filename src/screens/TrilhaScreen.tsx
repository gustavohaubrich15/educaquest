import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavSlider } from '../shared/components/NavSlider';
import { Button } from '../shared/components/Button';
import { EditQuestaoCard, IQuestao } from '../shared/components/EditQuestaoCard';
import { QuestaoCard } from '../shared/components/QuestaoCard';
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { UsuarioLogadoContext } from '../shared/context/UsuarioLogadoContext';
import { toast } from 'react-toastify';
import { databaseFirebase } from '../App';



export interface ITrilha {
    id: string
    titulo: string,
    descricao: string,
    questoes: IQuestao[]
}

export const TrilhaScreen: React.FC = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [questoes, setQuestoes] = useState<IQuestao[]>([])
    const [paginateFrom, setPaginateFrom] = useState(0)
    const [paginateTo, setPaginateTo] = useState(6)
    const [loading, setLoading] = useState<boolean>(false)
    const [questaoEditarCard, setQuestaoEditarCard] = useState<IQuestao>()
    const [indexQuestaoEditarCard, setindexQuestaoEditarCard] = useState<number>(0)
    const { usuarioLogado } = useContext(UsuarioLogadoContext)


    useEffect(() => {
        if (location.state) {
            getTrilha()
        }
    }, [])

    const getTrilha = async () => {
        const documentRef = doc(databaseFirebase, "trilhas", location.state)
        const trilhaFirebase = await getDoc(documentRef)

        if (trilhaFirebase.exists()) {
            let trilhaEdit = trilhaFirebase.data()
            setTitulo(trilhaEdit.titulo)
            setDescricao(trilhaEdit.descricao)
            setQuestoes(trilhaEdit.questoes)
        }
    }

    const PaginaAnterior = () => {

        setPaginateFrom((prevValue) => prevValue - 6)
        setPaginateTo((prevValue) => prevValue - 6)
    };

    const ProximaPagina = () => {
        setPaginateFrom((prevValue) => prevValue + 6)
        setPaginateTo((prevValue) => prevValue + 6)
    };

    const adicionarQuestao = (questao: IQuestao) => {
        let newQuestoes = questoes
        newQuestoes.push(questao)
        setQuestoes(newQuestoes)
        setLoading(true)

        setTimeout(() => { setLoading(false) }, 10);

    }

    const editarQuestao = (questao: IQuestao) => {
        let newQuestoes = questoes.map((oldQuestao, index) => {
            if (index === indexQuestaoEditarCard) {
                return questao
            } else {
                return oldQuestao
            }
        })
        setQuestoes(newQuestoes)
        setQuestaoEditarCard(undefined)
        setindexQuestaoEditarCard(0)
        setLoading(true)

        setTimeout(() => { setLoading(false) }, 10);

    }

    const editarCard = (questao: IQuestao, index: number) => {
        setQuestaoEditarCard(questao)
        setindexQuestaoEditarCard(index)
    }

    const salvarTrilha = async () => {
        if (titulo === '') {
            toast.error('Você não adicionou o título da trilha.')
            return
        }

        if (location.state !== '') {

            try {

                let usuarioId = usuarioLogado?.uid
                const documentRef = doc(databaseFirebase, "trilhas", location.state)
                await updateDoc(documentRef, {
                    usuarioId: usuarioId,
                    titulo: titulo,
                    descricao: descricao,
                    questoes: questoes
                });
                toast.success('Trilha editada com sucesso!');
                navigate('/home')
            } catch (error) {
                toast.error('Erro ao adicionar a trilha.');
            }
        } else {

            try {

                let usuarioId = usuarioLogado?.uid

                await addDoc(collection(databaseFirebase, "trilhas"), {
                    usuarioId: usuarioId,
                    titulo: titulo,
                    descricao: descricao,
                    questoes: questoes
                });
                toast.success('Trilha adicionada com sucesso!');
                navigate('/home')
            } catch (error) {
                toast.error('Erro ao adicionar a trilha.');
            }

        }
    };

    return (
        <>
            <NavSlider />
            <div className="flex space-x-2 justify-center items-center pl-32">
                <EditQuestaoCard questaoEditarCard={questaoEditarCard} onAddQuestao={(questao: IQuestao) => { adicionarQuestao(questao) }} onEditQuestao={(questao: IQuestao) => { editarQuestao(questao) }} />

                <div className="flex flex-col space-y-5 w-[55vw] h-screen">
                    <div className="flex space-x-5 pt-5 justify-center items-center text-lg font-bold">
                        <div className="flex flex-col">
                            <label className="block  tracking-wide text-gray-700 ">
                                Título da trilha
                            </label>
                            <input value={titulo} onChange={(e) => { setTitulo(e.target.value) }} className="appearance-none block w-72 bg-gray-200 text-gray-700 border border-black rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite o título da trilha" />
                        </div>
                        <div>
                            Número de questões - {questoes.length}
                        </div>
                        <div>
                            <button onClick={() => { salvarTrilha() }} className="bg-white hover:bg-slate-300 mb-2 font-bold py-1 px-3 rounded-full">
                                Salvar Trilha
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-5 pl-1 justify-center items-start flex-col">
                        <label className="block  tracking-wide text-gray-700 font-semibold pl-7">
                            Descrição
                        </label>
                        <input value={descricao} onChange={(e) => { setDescricao(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite a descrição da trilha" />

                    </div>

                    <div className=" flex flex-col  space-y-2 pt-5 justify-center items-center font-bold text-white   flex-wrap">

                        <div className=" flex-row  flex flex-wrap justify-center space-x-5">
                            {!loading && questoes.slice(paginateFrom, paginateTo).map((questao, index) => {
                                return <QuestaoCard
                                    key={index}
                                    pergunta={questao.pergunta}
                                    numeroAlternativas={questao.alternativas.length}
                                    onEditQuestao={() => { editarCard(questao, index) }}
                                />
                            })}
                        </div>

                        <div className=" w-full flex justify-center pb-2 space-x-2">
                            {paginateTo > 6 && <Button descricao="< Anterior" onClick={PaginaAnterior} />}
                            {questoes.length > paginateTo && <Button descricao="Próxima >" onClick={ProximaPagina} />}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}