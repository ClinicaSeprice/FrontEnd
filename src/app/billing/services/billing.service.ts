import { Injectable } from '@angular/core';
import { Observable, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LiquidacionMedico, MetodoPago, Medico, MedicoPago} from '../models/billing.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private URI = 'http://localhost:5070/api/';

  constructor(private http: HttpClient) { }

  getLiquidaciones(): Observable<LiquidacionMedico[]> {
    return this.http.get<LiquidacionMedico[]>(`${this.URI}LiquidacionMedico/obtenerLiquidaciones`).pipe(
      tap(response => { 
        return response;
      })
    );  
  }
  getMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(`${this.URI}MetodoDePago/obtenerMetodosDePago`).pipe(
      tap(response => { 
        return response;
      })
    );
  }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.URI}Medico/obtenerMedicos`).pipe(
      tap(response => { 
        console.log(response)
        return response;
      })
    );
  }

  postLiquidation(liquidacion: MedicoPago): Observable<MedicoPago> {
    const body = { ...liquidacion };
    return this.http.post<MedicoPago>(`${this.URI}LiquidacionMedico/altaLiquidacion`, body).pipe(
      tap(response => { 
        return response;
      })
    );
  } 
}
