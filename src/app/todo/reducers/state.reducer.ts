import { createReducer, on } from '@ngrx/store';

import { TodoActions, TodoApiActions } from '../actions';
import { Todo } from '../models';

export const stateFeatureKey = 'state';

export interface State {
  current: Todo | null;
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
    todos: [
      {
        guid: dto.guid,
        content: dto.content,
        isComplete: false,
        isPending: true,
        errorMessage: null,
      },
      ...state.todos ?? [],
    ],
  })),
  on(TodoApiActions.createSuccess, (state, { guid }) => ({
    ...state,
    todos: state.todos!.map((t) => t.guid === guid
      ? { ...t, isPending: false, errorMessage: null }
      : t
    ),
  })),
  on(TodoApiActions.createFailure, (state, { guid }) => ({
    ...state,
    todos: state.todos!.map((t) => t.guid === guid
      ? { ...t, isPending: false, errorMessage: 'Not saved' }
      : t
    ),
  })),
  on(TodoActions.complete, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid
      ? {
        ...state.current,
        isComplete: true,
        isPending: true,
        errorMessage: null,
      }
      : state.current,
    todos: state.todos?.map((t) => t.guid === guid
      ? { ...t, isComplete: true, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(TodoActions.uncomplete, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid
      ? {
        ...state.current,
        isComplete: false,
        isPending: true,
        errorMessage: null,
      }
      : state.current,
    todos: state.todos?.map((t) => t.guid === guid
      ? { ...t, isComplete: false, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(
    TodoApiActions.completeSuccess,
    TodoApiActions.uncompleteSuccess,
    (state, { guid }) => ({
      ...state,
      current: state.current?.guid === guid
        ? { ...state.current, isPending: false, errorMessage: null }
        : state.current,
      todos: state.todos!.map((t) => t.guid === guid
        ? { ...t, isPending: false, errorMessage: null }
        : t
      ),
    })
  ),
  on(TodoApiActions.uncompleteFailure, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid
      ? {
        ...state.current,
        isPending: false,
        isComplete: false,
        errorMessage: 'Not complete',
      }
      : state.current,
    todos: state.todos!.map((t) => t.guid === guid
      ? {
        ...t,
        isPending: false,
        isComplete: false,
        errorMessage: 'Not complete',
      }
      : t
    ),
  })),
  on(TodoApiActions.uncompleteFailure, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid
      ? {
        ...state.current,
        isPending: false,
        isComplete: true,
        errorMessage: 'Not uncomplete',
      }
      : state.current,
    todos: state.todos!.map((t) => t.guid === guid
      ? {
        ...t,
        isPending: false,
        isComplete: true,
        errorMessage: 'Not uncomplete',
      }
      : t
    ),
  })),
  on(TodoActions.remove, (state, { guid }) => ({
    ...state,
    current: state.current?.guid === guid
      ? { ...state.current, isPending: true, errorMessage: null }
      : state.current,
    todos: state.todos?.map((t) => t.guid === guid
      ? { ...t, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(TodoApiActions.removeSuccess, (state, { guid }) => ({
    ...state,
    todos: state.todos!.filter((t) => t.guid !== guid),
  })),
  on(
    TodoApiActions.updateFailure,
    TodoApiActions.removeFailure,
    (state, { guid }) => ({
      ...state,
      current: state.current?.guid === guid
        ? { ...state.current, isPending: false, errorMessage: 'Try again' }
        : state.current,
      todos: state.todos!.map((t) => t.guid === guid
        ? { ...t, isPending: false, errorMessage: 'Try again' }
        : t
      ),
    })
  )
);
