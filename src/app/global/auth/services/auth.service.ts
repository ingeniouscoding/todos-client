import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { JwtTokens, LoginCredentials, RegisterCredentials } from '../models';

const url = environment.url + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${url}/login`, credentials);
  }

  register(credentials: RegisterCredentials): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${url}/register`, credentials);
  }

  refresh(refresh_token: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${url}/token`, { refresh_token });
  }

  logout(refresh_token: string): Observable<any> {
    return this.http.post(`${url}/logout`, { refresh_token });
  }
}
