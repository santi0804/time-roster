import React from 'react';
import './analitica.css'; // Puedes agregar estilos personalizados aquí

const Analitica = ({ employees, attendance }) => {
    // Calcula el total de empleados
    const totalEmployees = employees.length;

    // Calcula el total de horas trabajadas
    const totalHoursWorked = employees.reduce((total, employee) => {
        const checkIn = attendance[employee.id]?.checkIn;
        const checkOut = attendance[employee.id]?.checkOut;
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const hoursWorked = (checkOutDate - checkInDate) / (1000 * 60 * 60);
            return total + hoursWorked;
        }
        return total;
    }, 0);

    // Calcula el total de ausencias
    const totalAbsences = employees.reduce((total, employee) => {
        const isAbsent = !attendance[employee.id]?.checkIn || !attendance[employee.id]?.checkOut;
        return total + (isAbsent ? 1 : 0);
    }, 0);

    return (
        <div className="analitica-container">
            <h2>Analítica de Datos</h2>
            <div className="analitica-stats">
                <div className="stat-item">
                    <h3>Total de Empleados</h3>
                    <p>{totalEmployees}</p>
                </div>
                <div className="stat-item">
                    <h3>Total de Horas Trabajadas</h3>
                    <p>{totalHoursWorked.toFixed(2)}</p>
                </div>
                <div className="stat-item">
                    <h3>Total de Ausencias</h3>
                    <p>{totalAbsences}</p>
                </div>
            </div>
        </div>
    );
}

export default Analitica;
