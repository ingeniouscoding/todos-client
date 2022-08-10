import { createReducer, on } from '@ngrx/store';

import { AuthActions, AuthApiActions } from '../actions';
import { JwtPayload } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  isAuthenticated: boolean;
  user: JwtPayload | null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
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
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    isAuthenticated: !!user,
    user,
  }))
);
