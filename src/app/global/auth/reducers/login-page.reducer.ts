import { createReducer, on } from '@ngrx/store';

import { AuthApiActions, LoginPageActions } from '../actions';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  isPending: boolean;
  error: any | null;
}

const initialState: State = {
  isPending: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    ...state,
    isPending: true,
    error: null,
  })),
  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    isPending: false,
    error: null,
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    isPending: false,
    error,
  })),
);
