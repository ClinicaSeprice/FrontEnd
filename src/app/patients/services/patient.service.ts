import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/patient.model'; // ruta al archivo de la interfaz

@Injectable({
  providedIn: 'root',
})
export class PacienteService {

  private apiUrl = 'http://localhost:5070/api/Paciente/altaPaciente';

  constructor(private http: HttpClient) {}

   
  // Método para registrar un paciente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  altaPaciente(paciente: Paciente): Observable<any> {
    return this.http.post(`${this.apiUrl}/altaPaciente`, paciente);
  }

  // Método para buscar un paciente por DNI
  buscarPacientePorDni(dni: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(
      `${this.apiUrl}/buscarPacientePorDni/${dni}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buscarPaciente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscarPaciente`);
  }
}
