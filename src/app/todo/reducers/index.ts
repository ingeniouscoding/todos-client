import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '@todos/app.state';
import * as fromList from './list-page.reducer';
import * as fromState from './state.reducer';

export const todosFeatureKey = 'todos';

export interface TodosState {
  [fromState.stateFeatureKey]: fromState.State,
  [fromList.listPageFeatureKey]: fromList.State,
}

export interface State extends fromRoot.State {
  [todosFeatureKey]: TodosState,
}

export function reducers(state: TodosState | undefined, action: Action) {
  return combineReducers({
    [fromState.stateFeatureKey]: fromState.reducer,
    [fromList.listPageFeatureKey]: fromList.reducer,
  })(state, action);
}

const selectTodosFeature = createFeatureSelector<TodosState>(todosFeatureKey);

const selectStateFeature = createSelector(
  selectTodosFeature,
  (state) => state.state
);
export const selectTodos = createSelector(
  selectStateFeature,
  (state) => state.todos
);
