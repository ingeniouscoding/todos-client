import { createReducer, on } from "@ngrx/store";

import { TodoActions, TodoApiActions } from "../actions";

export const showPageFeatureKey = 'showPage';

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
  on(TodoActions.getById, (state) => ({
    ...state,
    isPending: true,
    error: null,
  })),
  on(TodoApiActions.getByIdSuccess, () => initialState),
  on(TodoApiActions.getByIdFailure, (state, { error }) => ({
    ...state,
    isPending: false,
    error,
  })),
  on(
    TodoApiActions.removeFailure,
    TodoApiActions.updateFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);
