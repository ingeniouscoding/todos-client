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

export const createSuccess = createAction(
  '[Todo/API] Create Todo Success',
  props<{ todo: Todo; }>()
);

export const createFailure = createAction(
  '[Todo/API] Create Todo Failure',
  props<{ error: any; }>()
);

export const updateSuccess = createAction(
  '[Todo/API] Update Todo Success',
  props<{ todo: Todo; }>()
);

export const updateFailure = createAction(
  '[Todo/API] Update Todo Failure',
  props<{ error: any; }>()
);

export const removeSuccess = createAction(
  '[Todo/API] Remove Todo Success',
  props<{ id: string; }>()
);

export const removeFailure = createAction(
  '[Todo/API] Remove Todo Failure',
  props<{ error: any; }>()
);
