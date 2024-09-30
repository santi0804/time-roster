const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud y manejar CORS
app.use(express.json()); // Para que Express pueda interpretar JSON
app.use(cors()); // Para permitir solicitudes desde el frontend

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia esto si tienes una contraseña
    database: 'login' // Asegúrate de que esta base de datos exista
});

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Ruta para manejar el login
app.post("/login", (req, res) => {
    const { email, password } = req.body; // Obtener email y password del cuerpo de la solicitud

    // Consulta SQL para verificar si el usuario y la contraseña coinciden
    const query = 'SELECT * FROM usuario WHERE email = ? AND password = ?';
    
    // Ejecutar la consulta
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }
        
        if (results.length === 0) {
            console.log('Credenciales incorrectas.');
            return res.status(401).send('Credenciales incorrectas');
        }
        
        // Si la consulta tiene resultados, imprimimos los resultados en la consola
        console.log('Inicio de sesión exitoso:', results);
        res.json(results); // Envía los resultados como respuesta JSON
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});