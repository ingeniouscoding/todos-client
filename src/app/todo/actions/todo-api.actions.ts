import { createAction, props } from "@ngrx/store";

import { Todo } from "../models";

export const getAllSuccess = createAction(
  '[Todo/API] Get All Todos Success',
  props<{ todos: Todo[]; }>()
);

export const getAllFailure = createAction(
  '[Todo/API] Get All Todos Failure',
  props<{ error: any; }>()
);

export const getByIdSuccess = createAction(
  '[Todo/API] Get Todo By ID Success',
  props<{ todo: Todo; }>()
);

export const getByIdFailure = createAction(
  '[Todo/API] Get Todo By ID Failure',
  props<{ error: any; }>()
);

export const createSuccess = createAction(
  '[Todo/API] Create Todo Success',
  props<{ guid: string; }>()
);

export const createFailure = createAction(
  '[Todo/API] Create Todo Failure',
  props<{ guid: string; error: any; }>()
);

export const updateSuccess = createAction(
  '[Todo/API] Update Todo Success',
  props<{ todo: Todo; }>()
);

export const updateFailure = createAction(
  '[Todo/API] Update Todo Failure',
  props<{ guid: string, error: any; }>()
);

export const completeSuccess = createAction(
  '[Todo/API] Complete Todo Success',
  props<{ todo: Todo; }>()
);

export const completeFailure = createAction(
  '[Todo/API] Complete Todo Failure',
  props<{ guid: string, error: any; }>()
);

export const removeSuccess = createAction(
  '[Todo/API] Remove Todo Success',
  props<{ guid: string; }>()
);

export const removeFailure = createAction(
  '[Todo/API] Remove Todo Failure',
  props<{ guid: string; error: any; }>()
);
