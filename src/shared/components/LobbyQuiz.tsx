import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { ReactComponent as CellPhoneIcon } from '../images/cellphone.svg'
import { useLocation } from 'react-router-dom';
import { IResponse, IUsersInfo } from '../../screens/QuizAdminScreen';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';

interface ILobbyQuiz {
   onChangeEntrouNaSala : (entrou : boolean) => void,
   onChangeCodigoSala : (codigo : string) => void,
   entrarNaSalaEmit : (userInfo: IUsersInfo, codigoSala: string) => void
}
export const LobbyQuiz: React.FC<ILobbyQuiz> = ({ onChangeEntrouNaSala, onChangeCodigoSala, entrarNaSalaEmit }) => {

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const [nome, setNome] = useState<string>('')
    const [color, setColor] = useState<string>('#ffc107')
    const [codigoSala, setCodigoSala] = useState<string>('')

    
    const entrarNaSala = () => {
        if (nome === '' || codigoSala === '') {
            toast.error('Preencha todos os campos!!')
            return
        }
        let userInfo: IUsersInfo =
        {
            nome: nome,
            color: color,
            numeroSala: Number(codigoSala),
            respostas: [],
            corretas: 0
        }
        entrarNaSalaEmit(userInfo, codigoSala)
    }

    
    useEffect(() => {
        const sala = params.get('room');
        if (sala && sala !== '') {
            setCodigoSala(sala)
            onChangeCodigoSala(sala)
        }
    }, [])

    return (
        <>
            <div className="flex flex-col space-y-2 md:pt-24 pt-10 md:justify-start items-center font-bold text-white h-full w-full ">
                <div className="text-lg font-bold uppercase">Código da sala :</div>
                <input value={codigoSala} onChange={(e) => { 
                    setCodigoSala(e.target.value)
                    onChangeCodigoSala(e.target.value) 
                }} className="appearance-none block w-32 md:w-80 h-10 text-center bg-gray-200 text-gray-700 border border-black rounded md:py-1 md:px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite o código da sala" />
                <div className="text-lg font-bold uppercase">Nome :</div>
                <input value={nome} onChange={(e) => { setNome(e.target.value) }} className="appearance-none block w-72 md:w-96 h-10 text-center bg-gray-200 text-gray-700 border border-black rounded md:py-1 md:px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Digite o seu nome completo" />
                <div className="text-lg font-bold uppercase">Escolha da cor :</div>
                <CirclePicker color={color} onChange={(color) => { setColor(color.hex) }} />
                <CellPhoneIcon className="mt-4 h-16 w-16 md:h-20 md:w-20" fill={color} />
                <button onClick={() => { entrarNaSala() }} className="bg-white hover:bg-slate-300 mb-2 font-bold py-1 px-3 rounded-full text-black">
                    Entrar na sala
                </button>
            </div>
        </>
    )

}