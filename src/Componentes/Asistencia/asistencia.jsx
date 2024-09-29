import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './asistencia.css'

function Asistencia({ employees, attendance, setAttendance }) {
  // Estado para manejar solicitudes, aprobaciones y empleado seleccionado
  const [requests, setRequests] = useState({});
  const [approvals, setApprovals] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Para almacenar el empleado seleccionado

  const handleInputChange = (event, employeeId, type) => {
    const { value } = event.target;
    setAttendance({
      ...attendance,
      [employeeId]: { ...attendance[employeeId], [type]: value },
    });
  };

  const handleRequestChange = (event, type) => {
    const { value } = event.target;
    setRequests({
      ...requests,
      [selectedEmployee]: { ...requests[selectedEmployee], [type]: value },
    });
  };

  const submitRequest = () => {
    if (selectedEmployee && requests[selectedEmployee]) {
      alert(`Solicitud de ${requests[selectedEmployee].type} registrada para ${selectedEmployee}.`);
    }
  };

  const handleApprovalChange = (event, employeeId) => {
    const { value } = event.target;
    setApprovals({
      ...approvals,
      [employeeId]: value,
    });
  };

  const approveRequest = (employeeId) => {
    const approval = approvals[employeeId];
    if (approval === 'Sí' && requests[employeeId]) {
      const { type, hours } = requests[employeeId];

      if (type === 'horasExtras') {
        const currentHours = attendance[employeeId]?.overtime || 0;
        setAttendance({
          ...attendance,
          [employeeId]: {
            ...attendance[employeeId],
            overtime: currentHours + parseFloat(hours),
          },
        });
      } else if (type === 'ausencia') {
        setAttendance({
          ...attendance,
          [employeeId]: {
            ...attendance[employeeId],
            checkIn: '',
            checkOut: '',
          },
        });
      }

      setRequests({
        ...requests,
        [employeeId]: {},
      });

      alert(`Solicitud de ${type} aprobada para ${employeeId}.`);
    } else if (approval === 'No') {
      alert(`Solicitud de ${requests[employeeId]?.type} rechazada para ${employeeId}.`);
    }
  };

  const calculateHoursWorked = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Calcula la diferencia en milisegundos entre las dos fechas
    const diffInMs = checkOutDate - checkInDate;
    
    // Convertir la diferencia a horas
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    // Redondear a dos decimales
    return Math.round(diffInHours * 100) / 100;
  };

  const calculateOvertime = (hoursWorked) => {
    const standardHours = 8;
    return hoursWorked > standardHours ? hoursWorked - standardHours : 0;
  };

  const calculateAbsence = (checkIn, checkOut) => {
    return !checkIn || !checkOut;
  };

  const generateReportData = () => {
    return employees.map((employee) => {
      const checkIn = attendance[employee.id]?.checkIn || '';
      const checkOut = attendance[employee.id]?.checkOut || '';
      const hoursWorked = calculateHoursWorked(checkIn, checkOut);
      const overtime = attendance[employee.id]?.overtime || calculateOvertime(hoursWorked);
      const absence = calculateAbsence(checkIn, checkOut) ? 'Sí' : 'No';

      return {
        documentNumber: employee.documento,
        name: employee.name,
        checkIn,
        checkOut,
        hoursWorked,
        overtime,
        absence,
      };
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const reportData = generateReportData();

    doc.text('Reporte de Asistencia', 14, 20);
    doc.autoTable({
      head: [['Documento', 'Empleado', 'Entrada', 'Salida', 'Horas Trabajadas', 'Horas Extras', 'Ausencia']],
      body: reportData.map((row) => [
        row.documentNumber,
        row.name,
        row.checkIn,
        row.checkOut,
        row.hoursWorked,
        row.overtime,
        row.absence,
      ]),
    });

    doc.save('reporte_asistencia.pdf');
  };

  const exportToExcel = () => {
    const reportData = generateReportData();
  
    // Define los encabezados en español
    const headers = [
      ['Documento', 'Empleado', 'Entrada', 'Salida', 'Horas Trabajadas', 'Horas Extras', 'Ausencia']
    ];
  
    // Convierte los datos en una hoja de cálculo sin encabezados
    const worksheet = XLSX.utils.aoa_to_sheet(headers);
  
    // Agrega los datos después de los encabezados
    XLSX.utils.sheet_add_json(worksheet, reportData, { skipHeader: true, origin: 'A2' });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
    // Exporta el archivo Excel
    XLSX.writeFile(workbook, 'reporte_asistencia.xlsx');
  };

  return (
    <>
      <br />
      <br />
      <h2>Solicitudes de Horas Extras y Ausencias</h2>
      <br />
      <select
        onChange={(e) => setSelectedEmployee(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Selecciona un empleado</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      {selectedEmployee && (
        <>
          <select onChange={(e) => handleRequestChange(e, 'type')} defaultValue="">

            <option value="" disabled>Selecciona el tipo de solicitud</option>
            <option value="horasExtras">Horas Extras</option>
            <option value="ausencia">Ausencia</option>
          </select>

          {requests[selectedEmployee]?.type === 'horasExtras' && (
            <input type="number" placeholder="Horas" onChange={(e) => handleRequestChange(e, 'hours')}/>
          )}
          <button onClick={submitRequest}>Registrar Solicitud</button>
        </>
        
      )}
      <br />
      <br />

      <h2>Generar Reporte</h2>
      <br />
      <br />
      <div className='contenedor-button'>
        <button className='buttonpdf' onClick={exportToPDF}>Exportar a PDF</button>
        <button className='buttonexcel' onClick={exportToExcel}>Exportar a Excel</button>
      </div>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Documento</th>
            <th>Hora de Entrada</th>
            <th>Hora de Salida</th>
            <th>Horas Trabajadas</th>
            <th>Horas Extras</th>
            <th>Ausencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const checkIn = attendance[employee.id]?.checkIn || '';
            const checkOut = attendance[employee.id]?.checkOut || '';
            const hoursWorked = calculateHoursWorked(checkIn, checkOut);
            const overtime = calculateOvertime(hoursWorked);
            const absence = calculateAbsence(checkIn, checkOut) ? 'Sí' : 'No';

            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.documento}</td>
                <td>
                  <input
                    type="datetime-local"
                    value={checkIn}
                    onChange={(e) => handleInputChange(e, employee.id, 'checkIn')}
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    value={checkOut}
                    onChange={(e) => handleInputChange(e, employee.id, 'checkOut')}
                  />
                </td>
                <td>{hoursWorked}</td>
                <td>{attendance[employee.id]?.overtime || overtime}</td>
                <td>{absence}</td>
                <td>
                  <select onChange={(e) => handleApprovalChange(e, employee.id)} defaultValue="">
                    <option value="" disabled>Seleccionar</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                  <button onClick={() => approveRequest(employee.id)}>Confirmar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Asistencia;