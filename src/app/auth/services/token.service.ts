import { Injectable } from '@angular/core';

import { JwtPayload, JwtTokens } from '../models';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getAccessToken(): string | null {
    return this.storage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN);
  }

  saveTokens(tokens: JwtTokens): void {
    this.storage.setItem(ACCESS_TOKEN, tokens.access_token);
    this.storage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }

  removeTokens(): void {
    this.storage.removeItem(ACCESS_TOKEN);
    this.storage.removeItem(REFRESH_TOKEN);
  }

  getUser(token: string | null = null): JwtPayload | null {
    if (!token) {
      token = this.storage.getItem(REFRESH_TOKEN);
    }
    return token !== null
      ? JSON.parse(window.atob(token.split('.')[1])) as JwtPayload
      : null;
  }
}
