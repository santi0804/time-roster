import React, { useState } from "react";
import styles from "../login/login.module.css"; // Asegúrate de que este CSS esté adecuado para el registro
import PopupError from "../popups/PopupError"; // Si quieres mostrar un popup de error
import { useNavigate } from "react-router-dom"; // Para redireccionar después del registro

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate(); // Hook para redireccionar

  // Función para manejar el registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el registro");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registro exitoso:", data);
        // Redirigir a la página de inicio de sesión o a otra página
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        setShowErrorPopup(true);
      });
  };

  return (
    <div className={styles.mainContainer}>
      {showErrorPopup && (
        <PopupError onClose={() => setShowErrorPopup(false)} />
      )}

      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form className={styles.formulario} onSubmit={handleRegisterSubmit}>
          <h1 className={styles.tituloForm}>Registrarse</h1>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            className={styles.inputBox}
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.inputBox}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.btnLog}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
