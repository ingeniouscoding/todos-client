import { createAction, props } from "@ngrx/store";

import { CreateTodoDto, UpdateTodoDto } from "../models";

export const getAll = createAction('[Todos] Get All Todos');

export const getById = createAction(
  '[Todos] Get Todo By ID',
  props<{ guid: string; }>()
);

export const create = createAction(
  '[Todos] Create Todo',
  props<{ dto: CreateTodoDto; }>()
);

export const update = createAction(
  '[Todos] Update Todo',
  props<{ dto: UpdateTodoDto; }>()
);

export const complete = createAction(
  '[Todos] Complete Todo',
  props<{ guid: string; }>()
);

export const uncomplete = createAction(
  '[Todos] Uncomplete Todo',
  props<{ guid: string; }>()
);

export const remove = createAction(
  '[Todos] Remove Todo',
  props<{ guid: string; }>()
);
