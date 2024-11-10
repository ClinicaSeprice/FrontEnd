import { Injectable } from '@angular/core';
import {Factura, PlanObraSocial, ObraSocial, MetodoPago,FacturaDetalle}  from '../models/liquidation.model';
import { Observable, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  private URI = 'http://localhost:5070/api/';

  constructor(
    private http: HttpClient
  ) { }
  
  getFacturas(): Observable<FacturaDetalle[]> {
    return this.http.get<FacturaDetalle[]>(`${this.URI}Factura/obtenerTodasLasFacturasDetalladas`).pipe(
      tap(response => { 
        return response;
      })
    );  
}

  registrarFactura(billing: Factura): Observable<Factura> {
    const body = { ...billing }; 
    return this.http.post<Factura>(`${this.URI}Factura/RegistrarFactura`, body).pipe(
      tap(response => { 
        return response;
      })
    );
  }

  getObrasSociales(): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(`${this.URI}ObraSocial/obtenerTodasLasObrasSociales`).pipe(
      tap(response => { 
        return response;
      })
    );
  }

  getPlanesObraSocial(idObraSocial: number): Observable<PlanObraSocial[]> {
    return this.http.get<PlanObraSocial[]>(`${this.URI}PlanObraSocial/obtenerPlanesPorObraSocial/${idObraSocial}`).pipe(
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

}
