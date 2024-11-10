import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { MedicoDto } from '../models/medico-dto.model';
import { HorarioDisponibleDto } from '../models/medico-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoUrl = `${environment.apiUrl}/api/Medico`;
  private horarioUrl = `${environment.apiUrl}/api/HorarioDisponible`;

  constructor(private http: HttpClient) {}

  // Obtener todos los médicos
  getMedicos(): Observable<MedicoDto[]> {
    return this.http.get<MedicoDto[]>(`${this.medicoUrl}/obtenerMedicos`);
  }

  // Registrar un nuevo médico
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registrarMedico(medico: MedicoDto): Observable<any> {
    return this.http.post(`${this.medicoUrl}/altaMedico`, medico);
  }

  // Obtener horarios disponibles de un médico
  getHorariosByMedico(idMedico: number): Observable<HorarioDisponibleDto[]> {
    return this.http.get<HorarioDisponibleDto[]>(`${this.horarioUrl}/buscarHorariosMedico/${idMedico}`);
  }

  // Registrar un nuevo horario para un médico
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registrarHorario(horario: HorarioDisponibleDto): Observable<any> {
    return this.http.post(`${this.horarioUrl}/RegistarHorarioMedico`, horario);
  }
}

