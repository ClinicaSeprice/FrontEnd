export interface ObraSocialDTO {
  idObraSocial: number;
  nombre: string | null;
  cuit: number;
  baja: boolean;
  fechaAlta: string; // formato date-time
  fechaModificacion: string; // formato date-time
}

export interface PlanObraSocialDTO {
  idPlan: number;
  idObraSocial: number;
  nombrePlan: string;
  cobertura: number;
  baja: boolean;
  fechaAlta: string; // formato date-time
  fechaModificacion: string; // formato date-time
}
