export interface MetodoPagoDTO {
  idMetodoPago?: number; // Opcional, ya que el ID lo define el backend
  nombre: string; // Nombre del método de pago (Ej. "Tarjeta de crédito")
  habilitado: boolean; // Indica si el método de pago está activo o no
}
