export interface JwtTokens {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
