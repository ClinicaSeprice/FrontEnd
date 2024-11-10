export interface AppointmentDto {
  id: number;
  idPersona: number;
  idMedico: number;
  fechaTurno: string;  // En formato 'YYYY-MM-DD'
  horaInicio: string;  // En formato 'HH:mm'
  horaFin: string;     // En formato 'HH:mm'
  motivo: string;
  estado: string;
  notas?: string;
}

