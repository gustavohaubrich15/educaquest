
import React,{ useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioLogadoContext } from "../shared/context/UsuarioLogadoContext";

interface IPrivateRoute {
  children?: React.ReactNode
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children}) => {
  const { usuarioLogado } = useContext(UsuarioLogadoContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(usuarioLogado === undefined){
      navigate('/')
    }
  },[])

  return (
    <>
      {children}
    </>
  );
};
