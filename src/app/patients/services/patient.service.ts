import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PatientDto } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private baseUrl = `${environment.apiUrl}/api/Paciente`;

  constructor(private http: HttpClient) {}

  // Método para obtener todos los pacientes
  getAllPatients(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(`${this.baseUrl}/obtenerPacientesConDatosCompletos`);
  }

  // Método para obtener un paciente por DNI
  getPatientByDni(dni: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.baseUrl}/buscarPacientePorDni/${dni}`);
  }

  // Método para crear un nuevo paciente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPatient(data: PatientDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/altaPaciente`, data);
  }

  // Método para actualizar datos de un paciente existente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatePatient(dni: number, data: PatientDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarPaciente/${dni}`, data);  // Ejemplo de endpoint para actualizar
  }
}
