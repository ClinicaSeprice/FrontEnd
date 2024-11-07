import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthResponse} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5070/api/Auth/login';   

  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<AuthResponse> {
    const body = { user:user, password:pass };
    return this.http.post<AuthResponse>(this.apiUrl, body);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }
}
