import { createReducer, on } from '@ngrx/store';

import { TodoApiActions } from '../actions';
import { Todo } from '../models';

export const stateFeatureKey = 'state';

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [],
};

export const reducer = createReducer(
  initialState,
  on(TodoApiActions.getAllSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(TodoApiActions.createSuccess, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
  })),
  on(TodoApiActions.updateSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => t.id === todo.id ? todo : t),
  })),
  on(TodoApiActions.removeSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  }))
);
