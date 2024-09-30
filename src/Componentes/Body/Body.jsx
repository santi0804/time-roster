import React, { useState } from "react";
import logo from '../../assets/profile.png'; // Ajusta la ruta según la ubicación de tu carpeta assets
import './body.css';

function Body({ children, user, isAuthenticated }) {
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad

    const handleLogoClick = () => {
        setIsVisible(!isVisible); // Alterna la visibilidad
    };

    return (
        <div className="body">
            {isAuthenticated && ( // Verifica si el usuario está autenticado
                <header className="App-header" style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="app-logo" 
                        onClick={handleLogoClick} // Maneja el clic en el logo
                        style={{ cursor: 'pointer' }} 
                    />
                    {isVisible && user && ( // Muestra el usuario solo si isVisible es true
                        <p style={{ marginLeft: '10px' }}>¡Bienvenido!: {user.email}</p>
                    )}
                </header>
            )}
            {children}
        </div>
    );
}

export default Body;
