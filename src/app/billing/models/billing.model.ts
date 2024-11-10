export interface MedicoPago {
  idMedico: number;
  porcentaje: number;
  montoTotal: number;
  idMetodoPago: number;
  numeroTransaccion: string;
}

export interface LiquidacionMedico {
  idLiquidacion: number;
  idMedico: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidad: string;
  fechaLiquidacion: string; 
  porcentaje: number;
  montoTotal: number;
  metodoDePago: string;
  numeroTransaccion: number;
}

export interface ResumenLiquidacionMedico {
  idLiquidacion: number;
  nombreCompleto: string;
  fechaLiquidacion: string; // o Date si deseas manejarlo como objeto de fecha
  numeroTransaccion: number;
  montoTotal: number;
}

export interface MetodoPago   {
  idMetodoPago: 1,
  nombre: string,
  habilitado: boolean
}

export interface Medico {
  idMedico: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: string;
  especialidad: string;
  legajo: number;
  fechaNacimiento: string;
  horarioDisponible: object;
}