import React, { useState } from 'react';
import './FormEmpleado.css'; // Asegúrate de que el nombre del archivo CSS sea correcto

function FormEmpleado({ employees, setEmployees }) {
  const [name, setName] = useState('');
  const [documento, setDocumento] = useState('');

  const handleAddEmployee = () => {
    if (name && documento) {
      setEmployees([...employees, { id: employees.length + 1, name, documento }]);
      setName('');
      setDocumento('');
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className='container1'>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Agregar Empleado</h3>
      <input
        className='input'
        type="text"
        placeholder="Nombre del empleado"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='input'
        type="number"
        placeholder="Documento"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />
      <button className='button' onClick={handleAddEmployee}>Agregar Empleado</button>
    </div>
  );
}

export default FormEmpleado;
