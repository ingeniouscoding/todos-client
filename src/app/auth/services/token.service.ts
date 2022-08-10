import { Injectable } from '@angular/core';

import { JwtTokens } from '../models';

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
}
