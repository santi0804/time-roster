import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './asistencia.css'


function Asistencia({ employees, attendance, setAttendance }) {
  // Estado para manejar solicitudes y aprobaciones
  const [requests, setRequests] = useState({});
  const [approvals, setApprovals] = useState({});

  // Maneja los cambios en los campos de hora de entrada y salida
  const handleInputChange = (event, employeeId, type) => {
    const { value } = event.target;
    setAttendance({
      ...attendance,
      [employeeId]: { ...attendance[employeeId], [type]: value },
    });
  };

  // Maneja los cambios en las solicitudes (tipo y horas)
  const handleRequestChange = (event, employeeId, type) => {
    const { value } = event.target;
    setRequests({
      ...requests,
      [employeeId]: { ...requests[employeeId], [type]: value },
    });
  };

  // Registra una solicitud de un empleado con una alerta
  const submitRequest = (employeeId) => {
    if (requests[employeeId]) {
      alert(`Solicitud de ${requests[employeeId].type} registrada para ${employeeId}.`);
    }
  };

  // Maneja los cambios en la decisión de aprobación
  const handleApprovalChange = (event, employeeId) => {
    const { value } = event.target;
    setApprovals({
      ...approvals,
      [employeeId]: value,
    });
  };

  // Procesa la aprobación de solicitudes y actualiza el estado de asistencia
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

      // Limpia la solicitud después de la aprobación
      setRequests({
        ...requests,
        [employeeId]: {},
      });

      alert(`Solicitud de ${type} aprobada para ${employeeId}.`);
    } else if (approval === 'No') {
      alert(`Solicitud de ${requests[employeeId]?.type} rechazada para ${employeeId}.`);
    }
  };

  // Calcula las horas trabajadas entre la hora de entrada y salida
  const calculateHoursWorked = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);

    const checkInDate = new Date();
    const checkOutDate = new Date();
    checkInDate.setHours(checkInHours, checkInMinutes);
    checkOutDate.setHours(checkOutHours, checkOutMinutes);

    const diffInMs = checkOutDate - checkInDate;
    return Math.round((diffInMs / (1000 * 60 * 60)) * 100) / 100;
  };

  // Calcula las horas extras basadas en un estándar de 8 horas
  const calculateOvertime = (hoursWorked) => {
    const standardHours = 8;
    return hoursWorked > standardHours ? hoursWorked - standardHours : 0;
  };

  // Determina si un empleado está ausente basado en la entrada y salida
  const calculateAbsence = (checkIn, checkOut) => {
    return !checkIn || !checkOut;
  };

  // Genera los datos para el reporte basados en la asistencia y solicitudes
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

  // Exporta los datos a un archivo PDF
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

  // Exporta los datos a un archivo Excel
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
                    type="time"
                    value={checkIn}
                    onChange={(e) => handleInputChange(e, employee.id, 'checkIn')}
                  />
                </td>
                <td>
                  <input
                    type="time"
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

      <h3>Solicitudes de Horas Extras y Ausencias</h3>
      {employees.map((employee) => (
        <div key={employee.id}>
          <h4>{employee.name}</h4>
          <select
            onChange={(e) => handleRequestChange(e, employee.id, 'type')}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona el tipo de solicitud
            </option>
            <option value="horasExtras">Horas Extras</option>
            <option value="ausencia">Ausencia</option>
          </select>
          {requests[employee.id]?.type === 'horasExtras' && (
            <input
              type="number"
              placeholder="Horas"
              onChange={(e) => handleRequestChange(e, employee.id, 'hours')}
            />
          )}
          <button onClick={() => submitRequest(employee.id)}>Registrar Solicitud</button>
        </div>
      ))}

      <h3>Generar Reporte</h3>
      <button onClick={exportToPDF}>Exportar a PDF</button>
      <button onClick={exportToExcel}>Exportar a Excel</button>
    </>
  );
}

export default Asistencia;
