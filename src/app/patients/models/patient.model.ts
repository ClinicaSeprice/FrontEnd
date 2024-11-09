export interface Paciente {
  nombre: string;
  apellido: string;
  dni: number | null;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string; // Se recomienda usar string para simplificar el formato
  fechaRegistro?: string;
  baja: boolean;
}
