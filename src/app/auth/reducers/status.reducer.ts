import { createReducer, on } from '@ngrx/store';

import { AuthActions, AuthApiActions } from '../actions';
import { JwtPayload, JwtTokens } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  tokens: JwtTokens | null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  tokens: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.registerSuccess,
    AuthApiActions.refreshSuccess,
    (state) => ({
      ...state,
      isAuthenticated: true,
    })
  ),
  on(
    AuthActions.forceLogout,
    AuthApiActions.logoutSuccess,
    () => initialState
  ),
  on(AuthActions.setUser, (state, { user, tokens }) => ({
    ...state,
    isAuthenticated: !!user,
    user,
    tokens,
  }))
);
