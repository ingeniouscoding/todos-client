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
  on(TodoActions.getById, (state, { id }) => ({
    ...state,
    current: state.current?.id === id ? state.current : null,
  })),
  on(TodoApiActions.getByIdSuccess, (state, { todo }) => ({
    ...state,
    current: todo,
  })),
  on(TodoApiActions.getAllSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(TodoApiActions.createSuccess, (state, { todo }) => ({
    ...state,
    todos: (state.todos ?? []).concat(todo),
  })),
  on(
    TodoActions.update,
    TodoActions.complete,
    (state, { dto }) => ({
      ...state,
      current: state.current?.id === dto.id
        ? { ...state.current, isPending: true }
        : state.current,
      todos: state.todos?.map((t) => t.id === dto.id
        ? { ...t, isPending: true }
        : t
      ) ?? null,
    })),
  on(
    TodoApiActions.updateSuccess,
    TodoApiActions.completeSuccess,
    (state, { todo }) => ({
      ...state,
      current: state.current?.id === todo.id ? todo : state.current,
      todos: state.todos?.map((t) => t.id === todo.id
        ? todo
        : t
      ) ?? null,
    })),
  on(
    TodoApiActions.completeFailure,
    TodoApiActions.updateFailure,
    TodoApiActions.removeFailure,
    (state, { id }) => ({
      ...state,
      current: state.current?.id === id
        ? { ...state.current, isPending: false }
        : state.current,
      todos: state.todos?.map((t) => t.id === id
        ? { ...t, isPending: false }
        : t
      ) ?? null,
    })
  ),
  on(TodoApiActions.removeSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos?.filter((t) => t.id !== id) ?? null,
  }))
);
