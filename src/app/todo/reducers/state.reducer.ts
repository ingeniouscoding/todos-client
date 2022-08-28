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
  on(TodoActions.create, (state, { dto }) => ({
    ...state,
    todos: [
      {
        id: dto.id,
        content: dto.content,
        isComplete: false,
        isPending: true,
        errorMessage: null,
      },
      ...state.todos ?? [],
    ],
  })),
  on(TodoApiActions.createSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos!.map((t) => t.id === id
      ? { ...t, isPending: false, errorMessage: null }
      : t
    ),
  })),
  on(TodoApiActions.createFailure, (state, { id }) => ({
    ...state,
    todos: state.todos!.map((t) => t.id === id
      ? { ...t, isPending: false, errorMessage: 'Not saved' }
      : t
    ),
  })),
  on(TodoActions.complete, (state, { id }) => ({
    ...state,
    current: state.current?.id === id
      ? {
        ...state.current,
        isComplete: true,
        isPending: true,
        errorMessage: null,
      }
      : state.current,
    todos: state.todos?.map((t) => t.id === id
      ? { ...t, isComplete: true, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(TodoActions.uncomplete, (state, { id }) => ({
    ...state,
    current: state.current?.id === id
      ? {
        ...state.current,
        isComplete: false,
        isPending: true,
        errorMessage: null,
      }
      : state.current,
    todos: state.todos?.map((t) => t.id === id
      ? { ...t, isComplete: false, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(
    TodoApiActions.completeSuccess,
    TodoApiActions.uncompleteSuccess,
    (state, { id }) => ({
      ...state,
      current: state.current?.id === id
        ? { ...state.current, isPending: false, errorMessage: null }
        : state.current,
      todos: state.todos!.map((t) => t.id === id
        ? { ...t, isPending: false, errorMessage: null }
        : t
      ),
    })
  ),
  on(TodoApiActions.uncompleteFailure, (state, { id }) => ({
    ...state,
    current: state.current?.id === id
      ? {
        ...state.current,
        isPending: false,
        isComplete: false,
        errorMessage: 'Not complete',
      }
      : state.current,
    todos: state.todos!.map((t) => t.id === id
      ? {
        ...t,
        isPending: false,
        isComplete: false,
        errorMessage: 'Not complete',
      }
      : t
    ),
  })),
  on(TodoApiActions.uncompleteFailure, (state, { id }) => ({
    ...state,
    current: state.current?.id === id
      ? {
        ...state.current,
        isPending: false,
        isComplete: true,
        errorMessage: 'Not uncomplete',
      }
      : state.current,
    todos: state.todos!.map((t) => t.id === id
      ? {
        ...t,
        isPending: false,
        isComplete: true,
        errorMessage: 'Not uncomplete',
      }
      : t
    ),
  })),
  on(TodoActions.remove, (state, { id }) => ({
    ...state,
    current: state.current?.id === id
      ? { ...state.current, isPending: true, errorMessage: null }
      : state.current,
    todos: state.todos?.map((t) => t.id === id
      ? { ...t, isPending: true, errorMessage: null }
      : t
    ) ?? null,
  })),
  on(TodoApiActions.removeSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos!.filter((t) => t.id !== id),
  })),
  on(
    TodoApiActions.updateFailure,
    TodoApiActions.removeFailure,
    (state, { id }) => ({
      ...state,
      current: state.current?.id === id
        ? { ...state.current, isPending: false, errorMessage: 'Try again' }
        : state.current,
      todos: state.todos!.map((t) => t.id === id
        ? { ...t, isPending: false, errorMessage: 'Try again' }
        : t
      ),
    })
  )
);
