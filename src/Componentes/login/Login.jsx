import React, { useState } from "react";
import styles from "../login/login.module.css";
import PopupError from "../popups/PopupError";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  // Función para el inicio de sesión
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales incorrectas");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Inicio de sesión exitoso:", data);
        onLogin({ email: email });
      })
      .catch((error) => {
        console.error("Error en la autenticación:", error);
        setShowErrorPopup(true);
      });
  };

  return (
    <div className={styles.mainContainer}>
      {/* Mostrar popup de error si está activado */}
      {showErrorPopup && <PopupError onClose={() => setShowErrorPopup(false)} />}

      {/* Formulario de Inicio de Sesión */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form className={styles.formulario} onSubmit={handleLoginSubmit}>
          <h1 className={styles.tituloForm}>Iniciar Sesión</h1>
          <div className={styles.socialContainer}>
            <Link to="#" className={styles.social}>
              <FaFacebookF />
            </Link>
            <Link to="#" className={styles.social}>
              <FaGooglePlusG />
            </Link>
            <Link to="#" className={styles.social}>
              <FaLinkedinIn />
            </Link>
          </div>
          <span className={styles.parrafoForm}>o usa tu cuenta</span>
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
          <Link
            className={styles.olvidoPass}
            onClick={() => setShowForgotPasswordPopup(true)}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <button type="submit" className={styles.btnLog}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
