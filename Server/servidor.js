const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login', // Tu base de datos
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Obtener todos los empleados
app.get('/empleados', (req, res) => {
  connection.query('SELECT * FROM empleados', (err, results) => {
    if (err) {
      return res.status(500).send("Error al obtener empleados");
    }
    res.json(results);
  });
});

// Agregar un nuevo empleado
app.post('/empleados/agregar', (req, res) => {
  const { nombre, documento } = req.body;
  if (!nombre || !documento) {
    return res.status(400).send({ error: "Faltan datos del empleado" });
  }
  
  const query = 'INSERT INTO empleados (nombre, documento) VALUES (?, ?)';
  connection.query(query, [nombre, documento], (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).send({ error: "Error al agregar el empleado" });
    }
    res.status(200).send({ message: "Empleado agregado con éxito" });
  });
});

// Editar un empleado
app.put('/empleados/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, documento } = req.body;

  const query = 'UPDATE empleados SET nombre = ?, documento = ? WHERE id = ?';
  connection.query(query, [nombre, documento, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar el empleado:", err);
      return res.status(500).send({ error: "Error al editar el empleado" });
    }
    res.status(200).send({ message: "Empleado editado con éxito" });
  });
});

// Eliminar un empleado
app.delete('/empleados/eliminar/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM empleados WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el empleado:", err);
      return res.status(500).send({ error: "Error al eliminar el empleado" });
    }
    res.status(200).send({ message: "Empleado eliminado con éxito" });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
