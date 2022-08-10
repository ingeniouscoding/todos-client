import { createReducer, on } from "@ngrx/store";
import { AuthApiActions, RegisterPageActions } from "../actions";

export const registerPageFeatureKey = 'registerPage';

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
  on(RegisterPageActions.register, (state) => ({
    ...state,
    isPending: true,
    error: null,
  })),
  on(AuthApiActions.registerSuccess, (state) => ({
    ...state,
    isPending: false,
    error: null,
  })),
  on(AuthApiActions.registerFailure, (state, { error }) => ({
    ...state,
    isPending: false,
    error,
  }))
);
