import React, { useState } from "react";
import styles from "../login/login.module.css";
import PopupError from "../popups/PopupError";
import PopupChangeP from "../popups/PopupChange";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  // Estado para alternar entre el panel de registro y el de inicio de sesión
  const [rightPanelActive, setRightPanelActive] = useState(false);

  // Estados para manejar el email y la contraseña introducidos por el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar el popup de error
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Estado para mostrar el popup de "Olvidaste tu contraseña"
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  // Función que muestra el formulario de registro
  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  // Función que muestra el formulario de inicio de sesión
  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  // Función que maneja el envío del formulario de inicio de sesión
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
        onLogin({ email: email }); // Cambiar para pasar los datos del usuario
      })
      .catch((error) => {
        console.error("Error en la autenticación:", error);
        setShowErrorPopup(true);
      });
  };

  // Función para cerrar el popup de error
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  // Función para cerrar el popup de "Olvidaste tu contraseña"
  const closeForgotPasswordPopup = () => {
    setShowForgotPasswordPopup(false);
  };

  // Función para manejar el envío del formulario de recuperación de contraseña
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Correo de recuperación enviado");
    setShowForgotPasswordPopup(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Mostrar popup de error si está activado */}
      {showErrorPopup && <PopupError onClose={closeErrorPopup} />}

      {/* Mostrar popup de "Olvidaste tu contraseña" si está activado */}
      {showForgotPasswordPopup && (
        <PopupChangeP onClose={closeForgotPasswordPopup} submit={handleForgotPasswordSubmit} />
      )}

      <div
        className={`${styles.container} ${
          rightPanelActive ? styles.containerRightPanelActive : " "
        }`}
        id="container"
      >
        {/* Formulario de registro */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.formulario} action="#">
            <h1 className={styles.tituloForm}>Crear Cuenta</h1>
            <div className={styles.socialContainer}>
              <Link to="" className={styles.social}>
                <FaFacebookF />
              </Link>
              <Link to="" className={styles.social}>
                <FaGooglePlusG />
              </Link>
              <Link to="" className={styles.social}>
                <FaLinkedinIn />
              </Link>
            </div>
            <span className={styles.parrafoForm}>
              o usa tu correo electrónico para registrarte
            </span>
            <input className={styles.inputBox} type="text" placeholder="Nombre" />
            <input className={styles.inputBox} type="email" placeholder="Correo Electrónico" />
            <input className={styles.inputBox} type="password" placeholder="Contraseña" />
            <button className={styles.btnLog}>Regístrate</button>
          </form>
        </div>

        {/* Formulario de inicio de sesión */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.formulario} onSubmit={handleLoginSubmit}>
            <h1 className={styles.tituloForm}>Iniciar Sesión</h1>
            <div className={styles.socialContainer}>
              <Link to="" className={styles.social}>
                <FaFacebookF />
              </Link>
              <Link to="" className={styles.social}>
                <FaGooglePlusG />
              </Link>
              <Link to="" className={styles.social}>
                <FaLinkedinIn />
              </Link>
            </div>
            <span className={styles.parrafoForm}>o usa tu cuenta</span>
            <input
              className={styles.inputBox}
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' cuando cambia el valor
              required
            />
            <input
              className={styles.inputBox}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado 'password' cuando cambia el valor
              required
            />
            <Link
              className={styles.olvidoPass}
              onClick={() => setShowForgotPasswordPopup(true)} // Mostrar el popup cuando se haga clic en el enlace
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <button type="submit" className={styles.btnLog}>
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Panel de superposición */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.tituloForm}>¡Bienvenido!</h1>
              <p className={styles.parrafo}>
                Para mantenerte conectado con nosotros, por favor inicia sesión
                con tu información personal
              </p>
              <button className={styles.ghost} id="signIn" onClick={handleSignInClick}>
                Iniciar Sesión
              </button>
            </div>

            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.tituloForm}>¡Registrate!</h1>
              <p className={styles.parrafo}>
                Ingresa tus datos personales y comienza tu viaje con nosotros
              </p>
              <button className={styles.ghost} id="signUp" onClick={handleSignUpClick}>
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;