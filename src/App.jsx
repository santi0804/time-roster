import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEmpleado from './Componentes/FormEmpleado/formempleado';
import ListaEmpleado from './Componentes/ListaEmpleado/listaempleado';
import Asistencia from './Componentes/Asistencia/asistencia';
import Analitica from './Componentes/Analitica/analitica';
import LoginForm from './Componentes/login/Login';
import RegisterForm from './Componentes/Registro/register'; 
import Body from './Componentes/Body/Body';
import Sidebar from './Componentes/layouts/Sidebar';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Body user={user} isAuthenticated={isAuthenticated}>
                {isAuthenticated ? (
                    <div className="App">
                        <Sidebar onLogout={handleLogout} />
                        <div className="content">
                            <Routes>
                                <Route path="/agregar-empleado" element={<FormEmpleado employees={employees} setEmployees={setEmployees} />} />
                                <Route path="/empleados" element={<ListaEmpleado employees={employees} setEmployees={setEmployees} />} />
                                <Route path="/asistencia" element={<Asistencia employees={employees} attendance={attendance} setAttendance={setAttendance} />} />
                                <Route path="/analitica" element={<Analitica employees={employees} attendance={attendance} />} /> {/* Añadir la ruta de Analítica */}
                                <Route path="/register" element={<RegisterForm />} />
                                <Route path="/" element={<h3>Esta es la página principal.</h3>} />
                            </Routes>
                        </div>
                    </div>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </Body>
        </Router>
    );
}

export default App;
