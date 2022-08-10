import { createReducer, on } from "@ngrx/store";
import { AuthApiActions } from "../actions";

export const statusFeatureKey = 'status';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
  }))
);
