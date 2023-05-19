import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PrivateRoute } from './PrivateRoute';
import { EstatisticasScreen } from '../screens/EstatisticasScreen';
import { TrilhaScreen } from '../screens/TrilhaScreen';

export const RoutesApp: React.FC = () => {

    return (
        <> 
            <Routes>
                <Route path='/' element={<LoginScreen/>} />
                <Route path='/home' element={<PrivateRoute><HomeScreen/></PrivateRoute>} />
                <Route path='/estatisticas' element={<PrivateRoute><EstatisticasScreen/></PrivateRoute>} />
                <Route path='/trilhas' element={<PrivateRoute><TrilhaScreen/></PrivateRoute>}/>
                <Route path='*' element={<LoginScreen/>}  />
            </Routes>
        </>
    )
}