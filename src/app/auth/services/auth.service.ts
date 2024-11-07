import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5070/api/Auth/login';
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: string, pass: string): Observable<AuthResponse> {
    const body = { user: user, password: pass };
    return this.http.post<AuthResponse>(this.apiUrl, body).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAthunticated(): boolean {
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
    this.router.navigate(['/login']);
  }
}
