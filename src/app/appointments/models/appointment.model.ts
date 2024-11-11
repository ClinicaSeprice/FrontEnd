export interface AppointmentDto {
  idPersona?: number | string;
  idMedico?: number;
  idHorario?: number;
  motivo?: string;
  estado?: string;
  notas?: string;
  precioTurno?: number;
}

export interface TurnoDetalleDTO {
  idPaciente: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  dniPaciente: number;
  idTurno: number;
  fechaTurno: Date;
  precioTurno: number;
  motivo: string;
  estado: string;
  notas: string;
  fechaHorario: Date;
  horaInicio: string;
  horaFin: string;
  idMedico: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidadMedico: string;
}
