// src/app/services/obra-social.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ObraSocialDTO, PlanObraSocialDTO } from '../models/obras-sociales/obras-sociales.model';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Obtener todas las obras sociales
  obtenerObrasSociales(): Observable<ObraSocialDTO[]> {
    return this.http.get<ObraSocialDTO[]>(`${this.baseUrl}/ObraSocial/obtenerTodasLasObrasSociales`);
  }

  // Obtener una obra social por ID
  obtenerObraSocialPorId(id: number): Observable<ObraSocialDTO> {
    return this.http.get<ObraSocialDTO>(`${this.baseUrl}/ObraSocial/buscarObraSocialPorId/${id}`);
  }

  // Crear una nueva obra social
  crearObraSocial(obraSocial: ObraSocialDTO): Observable<ObraSocialDTO> {
    return this.http.post<ObraSocialDTO>(`${this.baseUrl}/ObraSocial/altaObraSocial`, obraSocial);
  }

  // Obtener los planes de una obra social específica por su ID
  obtenerPlanesPorObraSocial(idObraSocial: number): Observable<PlanObraSocialDTO[]> {
    return this.http.get<PlanObraSocialDTO[]>(`${this.baseUrl}/PlanObraSocial/obtenerPlanesPorObraSocial/${idObraSocial}`);
  }

  // Crear un nuevo plan de obra social
  crearPlanObraSocial(planObraSocial: PlanObraSocialDTO): Observable<PlanObraSocialDTO> {
    return this.http.post<PlanObraSocialDTO>(`${this.baseUrl}/PlanObraSocial/altaPlanObraSocial`, planObraSocial);
  }
}

