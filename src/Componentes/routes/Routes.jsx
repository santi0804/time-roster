import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//AQUI DEBEN IR LAS PAGES IMPORTADAS QUE SE VAN A USAR//
import Inicio from '../pages/Inicio';
import Registro from '../Asistencia/asistencia';

const AppRoutes =() => {
    return (
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/Registro' element={<Registro/>} />
        </Routes>
    );
};
export default AppRoutes;