import { createAction, props } from "@ngrx/store";

import { CreateTodoDto, UpdateTodoDto } from "../models";

export const getAll = createAction('[Todos] Get All Todos');

export const create = createAction(
  '[Todos] Create Todo',
  props<{ dto: CreateTodoDto; }>()
);

export const update = createAction(
  '[Todos] Update Todo',
  props<{ dto: UpdateTodoDto; }>()
);

export const remove = createAction(
  '[Todos] Remove Todo',
  props<{ id: string; }>()
);
