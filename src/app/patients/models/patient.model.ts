export interface PatientDto {
  nombre: string;
  apellido: string;
  dni: number;
  email?: string;
  telefono?: string;
  fechaNacimiento: string;  // Ajuste para usar string en vez de Date
  fechaRegistro: string;
  baja: boolean;
}
