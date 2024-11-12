import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5070/api/Auth';
  private tokenKey = 'authToken';

  //BehavirioSubjet para emitir el estado de autenticacion
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: string, pass: string): Observable<AuthResponse> {
    const body = { user: user, password: pass };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error de autenticación: ', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
        alert('Usuario registrado exitosamente.');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el registro:', error);
        const errorMessage = error.error?.text || 'Error en el registro. Intente de nuevo más tarde.';
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if(typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    if (expirationDate <= new Date()) {
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
