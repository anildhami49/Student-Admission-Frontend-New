import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}