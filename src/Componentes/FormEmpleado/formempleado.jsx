import React, { useState } from 'react';
import './FormEmpleado.css';

function FormEmpleado({ employees, setEmployees }) {
  const [name, setName] = useState('');
  const [documento, setDocumento] = useState('');

  const handleAddEmployee = () => {
    if (name && documento) {
      // Enviar solicitud POST al servidor para agregar empleado
      fetch('http://localhost:3001/empleados/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, documento }), // Enviar los datos como JSON
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(errorData.error); // Lanzar un error si hay problema
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Empleado agregado:', data.message);
          // Actualizar la lista en el estado
          setEmployees([...employees, { id: employees.length + 1, nombre: name, documento }]);
          setName(''); // Limpiar los inputs
          setDocumento('');
        })
        .catch(error => {
          console.error('Error al agregar el empleado:', error.message);
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className='container1'>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Agregar Empleado</h3>
      <input
        className='input'
        type='text'
        placeholder='Nombre del empleado'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='input'
        type='number'
        placeholder='Documento'
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />
      <button className='button' onClick={handleAddEmployee}>Agregar Empleado</button>
    </div>
  );
}

export default FormEmpleado;
