import React, { useState } from 'react';
import './listaempleado.css'


function listaempleado({ employees, setEmployees }) {
  // Estados para manejar la edición y eliminación
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDocumento, setEditedDocumento] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Función para manejar la eliminación del empleado
  const handleDeleteEmployee = () => {
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeToDelete);
    setEmployees(updatedEmployees);
    setShowConfirmDelete(false); // Cerrar el cuadro de confirmación
    setEmployeeToDelete(null); // Limpiar el estado de empleado a eliminar
  };

  // Función para mostrar la ventana de confirmación de eliminación
  const confirmDeleteEmployee = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmDelete(true);
  };

  // Función para iniciar la edición de un empleado
  const handleEditEmployee = (employee) => {
    setEditingEmployeeId(employee.id);
    setEditedName(employee.name);
    setEditedDocumento(employee.documento);
  };

  // Función para guardar los cambios en el nombre y documento del empleado
  const handleSaveEdit = (id) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, name: editedName, documento: editedDocumento }
        : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployeeId(null); // Salir del modo de edición
    setEditedName('');
    setEditedDocumento(''); // Limpiar los campos de edición
  };

  return (
    <div>
      <h2>Lista de Empleados</h2>
      {employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <input
                      type="text"
                      value={editedDocumento}
                      onChange={(e) => setEditedDocumento(e.target.value)}
                    />
                  ) : (
                    employee.documento
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(employee.id)}>Guardar</button>
                      <button onClick={() => setEditingEmployeeId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditEmployee(employee)}>Editar</button>
                      <button onClick={() => confirmDeleteEmployee(employee.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Ventana de confirmación de eliminación */}
      {showConfirmDelete && (
        <div className="confirm-delete">
          <p>¿Estás seguro de que deseas eliminar este empleado?</p>
          <button onClick={handleDeleteEmployee}>Sí, eliminar</button>
          <button onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default listaempleado;
