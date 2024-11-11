import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { AppointmentDto, TurnoDetalleDTO } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = `${environment.apiUrl}/api/Turno`;

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getAppointmentDetails(): Observable<TurnoDetalleDTO[]> {
  return this.http.get<TurnoDetalleDTO[]>(`${this.baseUrl}/ObtenerTodosLosTurnos`);
  }

  // Obtener una cita por ID
  getAppointmentById(id: number): Observable<AppointmentDto> {
    return this.http.get<AppointmentDto>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva cita
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createAppointment(appointment: AppointmentDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/RegistrarTurno`, appointment);
  }

  // Actualizar una cita existente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAppointment(id: number, appointment: AppointmentDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/ActualizarTurno/${id}`, appointment);
  }

  // Eliminar una cita
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/AnularTurno/${id}`);
  }
}
