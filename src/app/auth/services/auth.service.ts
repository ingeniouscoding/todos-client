import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  JwtTokens,
  LoginCredentials,
  RegisterCredentials
} from '../models';

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

  refresh(refresh_token: string): Observable<JwtTokens> {
    const url = 'http://localhost:3333/auth/token';
    return this.http.post<JwtTokens>(url, { refresh_token });
  }

  logout(refresh_token: string): Observable<any> {
    const url = 'http://localhost:3333/auth/logout';
    return this.http.post(url, { refresh_token });
  }
}
