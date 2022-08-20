import { createReducer, on } from '@ngrx/store';

import { TodoActions, TodoApiActions } from '../actions';
import { Todo } from '../models';

export const stateFeatureKey = 'state';

export interface State {
  current: Todo | null,
  todos: Todo[] | null;
}

const initialState: State = {
  current: null,
  todos: null,
};

export const reducer = createReducer(
  initialState,
  on(TodoActions.getById, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid ? state.current : null,
  })),
  on(TodoApiActions.getByIdSuccess, (state, { todo }) => ({
    ...state,
    current: todo,
  })),
  on(TodoApiActions.getAllSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(TodoActions.create, (state, { dto }) => ({
    ...state,
    todos: (state.todos ?? []).concat({
      guid: dto.guid,
      content: dto.content,
      isComplete: false,
      isPending: true,
    }),
  })),
  on(TodoApiActions.createSuccess, (state, { guid }) => ({
    ...state,
    todos: state.todos!.map((t) => t.guid === guid
      ? { ...t, isPending: false }
      : t
    ),
  })),
  on(TodoApiActions.createFailure, (state, { guid }) => ({
    ...state,
    todos: state.todos!.map((t) => t.guid === guid
      ? { ...t, isPending: false, error: 'Not saved' }
      : t
    ),
  })),
  on(
    TodoActions.update,
    TodoActions.complete,
    (state, { dto }) => ({
      ...state,
      current: state.current?.guid === dto.guid
        ? { ...state.current, isPending: true }
        : state.current,
      todos: state.todos?.map((t) => t.guid === dto.guid
        ? { ...t, isPending: true }
        : t
      ) ?? null,
    })
  ),
  on(
    TodoApiActions.updateSuccess,
    TodoApiActions.completeSuccess,
    (state, { todo }) => ({
      ...state,
      current: state.current?.guid === todo.guid ? todo : state.current,
      todos: state.todos!.map((t) => t.guid === todo.guid
        ? todo
        : t
      ),
    })
  ),
  on(
    TodoApiActions.completeFailure,
    TodoApiActions.updateFailure,
    TodoApiActions.removeFailure,
    (state, { guid }) => ({
      ...state,
      current: state.current?.guid === guid
        ? { ...state.current, isPending: false }
        : state.current,
      todos: state.todos!.map((t) => t.guid === guid
        ? { ...t, isPending: false }
        : t
      ),
    })
  ),
  on(TodoApiActions.removeSuccess, (state, { guid }) => ({
    ...state,
    todos: state.todos!.filter((t) => t.guid !== guid),
  }))
);
