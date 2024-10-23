export interface Appointment {
  id: string; // Identificador único del turno
  title: string; // Título o nombre del turno
  date: string; // Fecha del turno en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  description?: string; // Descripción opcional del turno
  location?: string; // Ubicación opcional del turno
  time?: string; // Hora opcional del turno (solo en vistas diarias o semanales)
}
