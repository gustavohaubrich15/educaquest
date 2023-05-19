import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavSlider } from '../shared/components/NavSlider';

export const EstatisticasScreen: React.FC = () => {

    const navigate = useNavigate()


    return (
        <>  
            <NavSlider />
            <div className="flex flex-col space-y-1 justify-center items-center font-bold text-white h-full w-full md:pl-24">
               ESTATISTICAS
            </div>
        </>
    )

}