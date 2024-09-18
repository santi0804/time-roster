import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Importa BrowserRouter en lugar de Router
import FormEmpleado from "./Componentes/FormEmpleado/formempleado";
import ListaEmpleado from "./Componentes/ListaEmpleado/listaempleado";
import Asistencia from "./Componentes/Asistencia/asistencia";
import AppRoutes from "./Componentes/routes/Routes"; // Asegúrate de que 'AppRoutes' esté importado correctamente
import LoginForm from "./Componentes/login/Login";
import Body from "./Componentes/Body/Body";
import Sidebar from "./Componentes/layouts/Sidebar"; // Asegúrate de importar el Sidebar si se está utilizando
import Inicio from "./Componentes/pages/Inicio";
import "./App.css";

function App() {
  // Estado que controla si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función que actualiza el estado para autenticar al usuario
  const handleLogin = () => {
    setIsAuthenticated(true); // Cambia el estado a 'true' cuando el usuario inicia sesión
  };

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});

  return (
    <Router>
      <Body/>
      {/* Verifica si el usuario está autenticado */}
      {isAuthenticated ? (
        <div className="App">
          {/* Si está autenticado, se muestran el sidebar y las rutas */}
          {/*<Sidebar />*/} 

          <div className="content">
            <FormEmpleado employees={employees} setEmployees={setEmployees} />
            <br />
            <AppRoutes /> {/* Utiliza el componente 'AppRoutes' para las rutas */}
            <Asistencia employees={employees} attendance={attendance} setAttendance={setAttendance}/>
            <ListaEmpleado employees={employees} setEmployees={setEmployees} />
            <br />
          </div>
        </div>
        
      ) : (
        // Si no está autenticado, se muestra el formulario de login
        <LoginForm onLogin={handleLogin} />
        
      )}
      
    </Router>

  ); 
}

export default App;
