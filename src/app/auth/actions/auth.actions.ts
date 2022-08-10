import { createAction, props } from '@ngrx/store';

import { JwtPayload } from '../models';

export const logout = createAction('[Auth] Logout');

export const forceLogout = createAction('[AUTH] Force Logout');

export const refresh = createAction('[Auth] Refresh Token');

export const getUser = createAction('[Auth] Get User From JWT');

export const setUser = createAction(
  '[Auth] Set User From JWT',
  props<{ user: JwtPayload | null; }>()
);
