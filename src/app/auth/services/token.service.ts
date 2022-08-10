import { Injectable } from '@angular/core';

import { JwtPayload, JwtTokens } from '../models';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveTokens(tokens: JwtTokens): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }

  removeTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  getUser(token: string | null = null): JwtPayload | null {
    if (!token) {
      token = localStorage.getItem(REFRESH_TOKEN);
    }
    return token !== null
      ? JSON.parse(window.atob(token.split('.')[1])) as JwtPayload
      : null;
  }
}
