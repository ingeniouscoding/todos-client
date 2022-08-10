import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JwtTokens, LoginCredentials, RefreshCredentials, RegisterCredentials } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<JwtTokens> {
    const url = 'http://localhost:3333/auth/login';
    return this.http.post<JwtTokens>(url, credentials);
  }

  register(credentials: RegisterCredentials): Observable<JwtTokens> {
    const url = 'http://localhost:3333/auth/register';
    return this.http.post<JwtTokens>(url, credentials);
  }

  refresh(credentials: RefreshCredentials): Observable<JwtTokens> {
    const url = 'http://localhost:3333/auth/register';
    return this.http.post<JwtTokens>(url, credentials);
  }
}
