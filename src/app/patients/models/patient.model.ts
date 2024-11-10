export interface PatientDto {
  idPersona?: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: string;
  fechaNacimiento: string | null; // Puede ser null si el campo está vacío
  fechaRegistro: string; // Formato de fecha completa
  baja: boolean;
  direccion: string | null; // Puede ser null si el campo está vacío
  turnos: TurnoDto[]; // Lista de turnos asociados
  historiaClinica: HistoriaClinicaDto | null; // Detalles de la historia clínica
}

// Definición de `TurnoDto` con detalles adicionales para cada turno
export interface TurnoDto {
  idPersona: number;
  idMedico: number;
  idHorario: number;
  motivo: string;
  precioTurno: number;
  estado: string;
  notas: string;
  fechaTurno: string; // Fecha en formato completo
  especialidadMedico: string; // Especialidad del médico
  nombreMedico: string; // Nombre del médico
  apellidoMedico: string; // Apellido del médico
}

// Detalles completos de `HistoriaClinicaDto` para la historia clínica del paciente
export interface HistoriaClinicaDto {
  idHistoria?: number;
  antecedentes: string;
  diagnosticos: string;
  tratamientos: string;
  fechaApertura: string; // Fecha de apertura de la historia clínica
  fechaModificacion: string | null; // Fecha de última modificación, puede ser null
}
