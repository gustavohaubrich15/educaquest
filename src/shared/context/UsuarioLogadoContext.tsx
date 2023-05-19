import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUsuarioLogadoProvider {
    children?: React.ReactNode
}

export interface IUsuarioLogado{
    uid:  string,
    nome: string | null,
    foto: string | null,
    email: string | null,
}

interface IUsuarioLogadoContext {
    usuarioLogado?: IUsuarioLogado;
    changeUsuarioLogado: (usuarioLogado : IUsuarioLogado | undefined) => void
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContext>({} as IUsuarioLogadoContext)

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({ children }) => {

    const [usuarioLogado, setUsuarioLogado] = useState<IUsuarioLogado | undefined>(undefined)
    

    const changeUsuarioLogado = (usuarioAtual: IUsuarioLogado | undefined) => {
        setUsuarioLogado(usuarioAtual)
    }


    return (
        <>
            <UsuarioLogadoContext.Provider value={{ usuarioLogado, changeUsuarioLogado}}>
                {children}
            </UsuarioLogadoContext.Provider>
        </>
    )
}