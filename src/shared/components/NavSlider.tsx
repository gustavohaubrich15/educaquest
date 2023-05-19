import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { UsuarioLogadoContext } from '../context/UsuarioLogadoContext';
import usuarioDefault from '../images/usuarioDefault.png'
import { ReactComponent as HomeLogo } from '../images/home.svg'
import { ReactComponent as Origami } from '../images/origami.svg'
import { ReactComponent as Stats } from '../images/stats.svg'
import { ReactComponent as LogOut } from '../images/logout.svg';
import { ReactComponent as SetaDireita } from '../images/setaEsquerda.svg';
import { ReactComponent as SetaEsquerda } from '../images/setaDireita.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface INavSlider {

}

export const NavSlider: React.FC<INavSlider> = () => {
    const { usuarioLogado, changeUsuarioLogado } = useContext(UsuarioLogadoContext)
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (state) {
            setOpen(state)
        }
    }, [])



    return (
        <>

            {open ?
                <div>
                    <div onClick={() => { setOpen(!open) }} className="cursor-pointer fixed z-30 left-10 top-20 hover:bg-gray-200  md:left-[170px] md:top-20 rounded-full bg-white md:w-11 md:h-11 flex justify-center items-center transition-all">
                        {open ? <SetaDireita /> : <SetaEsquerda />}
                    </div>
                    <div className="w-14 md:fixed z-20 md:w-48 h-screen bg-slate-300 flex flex-col space-y-14 pt-10 text-black font-medium items-center transition-all">
                        <div className="flex space-x-2 justify-center items-center">
                            <Origami className="w-6 h-6 md:w-10 md:h-10" />
                            <div className="hidden md:flex text-sm font-bold">EducaQuest</div>
                        </div>
                        <div className=" flex flex-col w-full h-screen space-y-10 items-center">
                            <div className="flex flex-col space-y-2 text-center">
                                <div className="rounded-full bg-white flex  justify-center items-center md:w-24 md:h-24">
                                    {usuarioLogado?.foto ? <img src={usuarioLogado?.foto} referrerPolicy="no-referrer" className="w-6 h-6 rounded-full md:w-20 md:h-20"></img> :
                                        <img src={usuarioDefault} className="w-6 h-6 rounded-full md:w-20 md:h-20" ></img>}

                                </div>
                                <div className="hidden font-bold md:flex md:justify-center">{usuarioLogado?.nome ?? ''}</div>
                            </div>

                            <NavLink to={'/home'} className={`flex cursor-pointer rounded-full w-9 h-8 hover:bg-gray-200 justify-center items-center md:w-40 md:justify-start ${pathname === '/home' ? 'bg-gray-200 text-black' : 'text-gray-500'}`}><HomeLogo title='Home' className={`w-8 h-8 ${pathname === '/home' ? 'fill-black' : 'fill-gray-500'}`} /><div className="hidden md:flex items-center text-base pl-2">Home</div></NavLink>
                            <NavLink to={'/estatisticas'} className={`flex cursor-pointer rounded-full w-9 h-8 hover:bg-gray-200 justify-center items-center md:w-40 md:justify-start ${pathname === '/estatisticas' ? 'bg-gray-200 text-black' : 'text-gray-500'}`}><Stats className={`w-8 h-8 ${pathname === '/estatisticas' ? 'fill-black' : 'fill-gray-500'}`} /><div className="hidden md:flex items-center text-base pl-2 pb-[2px]">Estatísticas</div></NavLink>

                        </div>
                        <div className="flex flex-col justify-end pb-5">
                            <div onClick={() => {
                                changeUsuarioLogado(undefined)
                                navigate('/')
                            }} className="flex cursor-pointer rounded-full w-9 h-8 hover:bg-gray-200 justify-center items-center md:w-40 md:justify-start"><LogOut className="w-7 h-7" /><div className="hidden md:flex items-center text-base pl-2 pb-[2px]">Logout</div></div>
                        </div>
                    </div>
                </div> :
                <div>
                    <div onClick={() => { setOpen(!open) }} className="fixed z-30 cursor-pointer md:left-10 md:top-20 hover:bg-gray-200  left-[176px] top-20 rounded-full bg-white md:w-8 md:h-8 flex justify-center items-center transition-all">
                        {open ? <SetaDireita /> : <SetaEsquerda />}
                    </div>

                    <div className="w-48 fixed z-20 md:w-14 h-screen bg-slate-300 flex flex-col space-y-14 pt-10 text-black font-medium items-center transition-all">
                        <div className="flex space-x-2 justify-center items-center">
                            <Origami className="w-10 h-10 md:w-6 md:h-6" />
                            <div className="flex md:hidden text-sm font-bold">EducaQuest</div>
                        </div>
                        <div className=" flex flex-col w-full h-screen space-y-10 items-center">
                            <div className="flex flex-col space-y-2 text-center">
                                <div className="rounded-full bg-white flex  justify-center items-center w-24 h-24 md:w-10 md:h-10">
                                    {usuarioLogado?.foto ? <img src={usuarioLogado?.foto} referrerPolicy="no-referrer" className="w-20 h-20 rounded-full md:w-10 md:h-10"></img> :
                                        <img src={usuarioDefault} className="w-20 h-20 rounded-full md:w-6 md:h-6" ></img>}

                                </div>
                                <div className="font-bold md:hidden flex justify-center">{usuarioLogado?.nome ?? ''}</div>
                            </div>

                            <NavLink to={'/home'} state={{ open }} className={`flex cursor-pointer rounded-full md:w-9 h-8 hover:bg-gray-200 md:justify-center items-center mw-40 justify-start ${pathname === '/home' ? 'bg-gray-200 text-black' : 'text-gray-500'}`}><HomeLogo title='Home' className={`w-8 h-8 ${pathname === '/home' ? 'fill-black' : 'fill-gray-500'}`} /><div className="md:hidden items-center text-base pl-2">Home</div></NavLink>
                            <NavLink to={'/estatisticas'} state={{ open }} className={`flex cursor-pointer rounded-full md:w-9 h-8 hover:bg-gray-200 md:justify-center items-center w-40 justify-start ${pathname === '/estatisticas' ? 'bg-gray-200 text-black' : 'text-gray-500'}`}><Stats className={`w-8 h-8 ${pathname === '/estatisticas' ? 'fill-black' : 'fill-gray-500'}`} /><div className="md:hidden  items-center text-base pl-2 pb-[2px]">Estatísticas</div></NavLink>

                        </div>
                        <div className="flex flex-col justify-end pb-36 md:pb-5">
                            <div onClick={() => {
                                changeUsuarioLogado(undefined)
                                navigate('/')
                            }} className="flex cursor-pointer rounded-full md:w-9 h-8 hover:bg-gray-200 md:justify-center items-center mw-40 justify-start"><LogOut className="w-7 h-7" /><div className="md:hidden flex items-center text-sm md:text-base pl-2 pb-[2px]">Logout</div></div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}