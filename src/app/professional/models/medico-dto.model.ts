// medico-dto.model.ts
export interface MedicoDto {
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
}


// horario-disponible-dto.model.ts
export interface HorarioDisponibleDto {
  idMedico: number;
  nombreMedico?: string;
  fecha: string;       // En formato 'YYYY-MM-DD'
  horaInicio: string;  // En formato 'HH:mm'
  horaFin: string;     // En formato 'HH:mm'
  estado: boolean;
}
