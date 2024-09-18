import React, { useState } from 'react';
import './formempleado.css'



function formempleado({ employees, setEmployees }) {
  const [name, setName] = useState('');
  const [documento, setDocumento] = useState(''); // Cambio de nombre a 'documento'

  const handleAddEmployee = () => {
    if (name && documento) { // Verificar que ambos campos estén completos
      setEmployees([...employees, { id: employees.length + 1, name, documento }]); // Usar 'documento' en lugar de 'documentNumber'
      setName('');
      setDocumento('');
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className='container1'>
      <div>
      <input className='input' type="text" placeholder="Nombre del empleado" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>

      <div>
      <input className='input' type="number" placeholder="Documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
      </div>

      <div>
      <button className='button' onClick={handleAddEmployee}>Agregar Empleado</button>
    </div>

    <div></div>

    </div>

    
  );
}

export default formempleado;
