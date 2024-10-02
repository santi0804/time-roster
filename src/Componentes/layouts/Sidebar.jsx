import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaClipboardList, FaChartBar } from "react-icons/fa"; // Agregamos FaChartBar
import { FaUserGroup } from "react-icons/fa6";
import Style from '../layouts/sidebar.module.css';

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate(); // Hook para redireccionar

    const handleLogout = () => {
        onLogout(); // Llamar a la función onLogout que se pasó como prop
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div className={Style.sidebar}>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaHome className='me-2' /> Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/agregar-empleado" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaPlus className='me-2' /> Agregar Empleado
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/empleados" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaUserGroup className='me-2' /> Empleados
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/asistencia" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaClipboardList className='me-2' /> Asistencia
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analitica" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaChartBar className='me-2' /> Analitica {/* Nuevo enlace agregado */}
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogout} className={Style.logoutButton}>
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
