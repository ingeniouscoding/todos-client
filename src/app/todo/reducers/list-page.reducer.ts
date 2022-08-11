import { createReducer, on } from "@ngrx/store";

import { TodoActions, TodoApiActions } from "../actions";

export const listPageFeatureKey = 'listPage';

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
  on(TodoActions.getAll, (state) => ({
    ...state,
    isPending: true,
    error: null,
  })),
  on(TodoApiActions.getAllSuccess, () => initialState),
  on(TodoApiActions.getAllFailure, (state, { error }) => ({
    ...state,
    isPending: false,
    error,
  }))
);
