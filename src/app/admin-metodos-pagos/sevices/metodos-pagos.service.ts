import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment'; // Asegúrate de que el path es correcto
import { MetodoPagoDTO } from '../models/metodo-pagos';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private baseUrl = `${environment.apiUrl}/api/MetodoDePago`;

  constructor(private http: HttpClient) {}

  // Obtener todos los métodos de pago
  obtenerMetodosPago(): Observable<MetodoPagoDTO[]> {
    return this.http.get<MetodoPagoDTO[]>(`${this.baseUrl}/obtenerMetodosDePago`);
  }

  // Crear un nuevo método de pago
  crearMetodoPago(metodoPago: MetodoPagoDTO): Observable<MetodoPagoDTO> {
    return this.http.post<MetodoPagoDTO>(`${this.baseUrl}/altaMetodoDePago`, metodoPago);
  }
}
