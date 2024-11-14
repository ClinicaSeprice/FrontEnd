// medico-dto.model.ts
export interface MedicoDto {
  idMedico?: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: string;
  especialidad: string;
  legajo: number;
  fechaAlta: string;
  fechaBaja?: string;
  fechaModificacion?: string;
  user: string;
  password: string;
  fechaNacimiento: string;
  horariosDisponibles: HorarioDisponibleDto[];
}


// horario-disponible-dto.model.ts
export interface HorarioDisponibleDto {
  idHorario?: number; 
  idMedico: number;
  nombreMedico?: string;
  fecha: string;       // En formato 'YYYY-MM-DD'
  horaInicio: string;  // En formato 'HH:mm'
  horaFin: string;     // En formato 'HH:mm'
  estado: boolean;
}
