import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Style from '../layouts/sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={Style.sidebar}>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaHome className='me-2'/>Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ventas" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaChartBar className='me-2'/>Ventas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes" className={({ isActive }) => isActive ? `${Style.links} active` : Style.links}>
                        <FaUserGroup className='me-2'/>Clientes
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
