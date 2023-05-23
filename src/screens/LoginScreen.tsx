import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/components/Button';
import { ReactComponent as GoogleIcon } from '../shared/images/googleIcon.svg'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { IUsuarioLogado, UsuarioLogadoContext } from '../shared/context/UsuarioLogadoContext';
import { toast } from 'react-toastify';

export const LoginScreen: React.FC = () => {
    const { changeUsuarioLogado } = useContext(UsuarioLogadoContext)
    const navigate = useNavigate()
    
   
    const autenticar = async () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
    
        await signInWithPopup(auth, provider)
            .then((result) => {
                let usuarioLogado : IUsuarioLogado = {
                    uid: result.user.uid,
                    email: result.user.email,
                    foto: result.user.photoURL,
                    nome: result.user.displayName
                }
                changeUsuarioLogado(usuarioLogado)
                toast.success(`Bem-vindo ${usuarioLogado.nome}`)
                navigate('/home')
                
            }).catch((error) => {
                toast.error(`Ocorreu o seguinte erro ao logar : ${error.e}`)
                return
            });
    }

    return (
        <>  
            <div className="flex flex-col pt-24 space-y-1 justify-start max-sm:pt-28 items-center font-bold text-white  h-full w-full">

                <div className=" font-poppins text-6xl leading-10 max-sm:text-2xl">Educa Quest</div>
                <div className=" pt-5 flex justify-center items-center text-center space-x-2 ">
                    <div className="bg-white w-16 h-1 rounded-sm  max-sm:w-8"></div>
                    <div className="max-sm:text-xs" >REALIZE O LOGIN</div>
                    <div className="bg-white w-16 h-1 rounded-sm max-sm:w-8"></div>
                </div>
                <div className="pt-5">
                    <Button onClick={autenticar} descricao="Google" icon={<GoogleIcon />} />
                </div>
            </div>
         

        </>
    )

}