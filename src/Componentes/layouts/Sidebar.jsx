import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaClipboardList } from "react-icons/fa"; // Cambiamos el ícono a FaPlus
import { FaUserGroup } from "react-icons/fa6";
import Style from '../layouts/sidebar.module.css';

const Sidebar = ({ onLogout }) => {
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
                        <FaPlus className='me-2' /> Agregar Empleado {/* Cambiado a FaPlus */}
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
                    <button onClick={onLogout} className={Style.logoutButton}>
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
