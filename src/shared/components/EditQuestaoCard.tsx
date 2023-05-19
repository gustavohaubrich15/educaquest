import React, { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../images/delete.svg'
import { toast } from 'react-toastify';

export interface IEditQuestaoCard {
}
export interface IAlternativas {
    ordem: number,
    resposta: string,
    correta: boolean
}
export interface IQuestao{
    pergunta: string
    alternativas : IAlternativas[]
}

export const EditQuestaoCard: React.FC<IEditQuestaoCard> = ({ }) => {

    const [alternativas, setAlternativas] = useState<IAlternativas[]>([
        { resposta: 'america latina', correta: true, ordem: 1 }, { resposta: 'texas', correta: false, ordem: 2 }
        , { resposta: 'Nova york', correta: false, ordem: 3 }
        , { resposta: 'Campinas', correta: false, ordem: 4 }
        , { resposta: 'Panamá', correta: false, ordem: 5 }
    ])
    const [pergunta, setPergunta] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const addAlternativa = () => {
        console.log(alternativas.length)
        if (alternativas.length > 4) {
            toast.error('Não é possível adicionar mais do que 5 alternativas.')
            return
        }

        let novaOrdem = alternativas.length + 1
        let newAlternativas = alternativas
        newAlternativas.push({
            resposta: '',
            correta: false,
            ordem: novaOrdem
        })

        setAlternativas(newAlternativas)
        setLoading(true)

        setTimeout(() => { setLoading(false) }, 1);

    }

    const removerAlternativa = (ordem: number) => {
        let newAlternativas = alternativas.filter((alternativa) => {
            return alternativa.ordem !== ordem
        }).sort((a, b) => {
            return a.ordem - b.ordem;
        }).map((alternativa, index) => {
            return {
                ordem: index + 1,
                resposta: alternativa.resposta,
                correta: alternativa.correta
            }
        })
        setAlternativas(newAlternativas)


    }

    const handleChangeResposta = (resposta: string, ordem: number) => {
        let editAlternativa = alternativas.find((alternativa) => {
            return alternativa.ordem === ordem
        })
        if (editAlternativa) {
            editAlternativa.resposta = resposta
            let newAlternativas = alternativas.filter((alternativa) => {
                return alternativa.ordem !== ordem
            })
            newAlternativas.push(editAlternativa)
            setAlternativas(newAlternativas.sort((a, b) => {
                return a.ordem - b.ordem;
            }))
        }

    }

    const salvarQuestao = () =>{
        if(alternativas.length<2){
            toast.error('Você deve adicionar pelo menos duas respostas.')
            return
        }
        let respostasCorretas = alternativas.filter((alternativa)=>{
            return alternativa.correta
        })
        if(respostasCorretas.length > 1){
            toast.error('Você deve escolher somente uma questão como certa.')
            return
        }
        if(respostasCorretas.length < 1){
            toast.error('Você deve escolher uma questão como certa.')
            return
        }

    }

    return (
        <>
            <div className="flex flex-col bg-gray-300 h-[90%] w-[450px] rounded-lg">
                <div className="text-center font-semibold text-base pt-2 text-black"></div>
                <div className="px-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Pergunta
                    </label>
                    <textarea value={pergunta} onChange={(e)=>{setPergunta(e.target.value)}} className="appearance-none block w-full h-18 bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite a sua pergunta" />
                </div>
                <div className="px-2 flex items-center space-x-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Alternativas
                    </label>
                    <button title='Adicionar' onClick={() => addAlternativa()} className="bg-white hover:bg-slate-300  font-bold py-1 px-3 rounded-full">
                        +
                    </button>
                </div>
                <div className="px-2 py-2">

                </div>
                {!loading && alternativas.map((alternativa, index) => {
                    return <div key={index} className="px-2 space-y-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center justify-center space-x-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                    Resposta - {String.fromCharCode(96 + alternativa.ordem)}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none cursor-pointer" />
                                <label className="ml-2 text-sm text-gray-700  font-bold ">Correta</label>
                            </div>
                        </div>
                        <div className="flex space-x-1">
                            <input value={alternativa.resposta} onChange={(e) => { handleChangeResposta(e.target.value, alternativa.ordem) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite uma resposta" />

                            <div onClick={() => removerAlternativa(alternativa.ordem)} className="h-8 cursor-pointer bg-white hover:bg-slate-300 font-semibold text-xs flex items-center justify-center rounded">
                                <DeleteIcon title='Remover' />
                            </div>
                        </div>
                    </div>
                })}

                <div className="h-full flex items-end justify-center">
                    <button onClick={()=>{salvarQuestao()}} className="bg-white hover:bg-slate-300 mb-2 font-bold py-1 px-3 rounded-full">
                        Salvar
                    </button>
                </div>
            </div>
        </>
    )

}