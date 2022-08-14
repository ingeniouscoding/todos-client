import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from 'src/app/app.state';
import * as fromList from './list-page.reducer';
import * as fromShow from './show-page.reducer';
import * as fromState from './state.reducer';

export const todosFeatureKey = 'todos';

export interface TodosState {
  [fromState.stateFeatureKey]: fromState.State,
  [fromList.listPageFeatureKey]: fromList.State,
  [fromShow.showPageFeatureKey]: fromShow.State,
}

export interface State extends fromRoot.State {
  [todosFeatureKey]: TodosState,
}

export function reducers(state: TodosState | undefined, action: Action) {
  return combineReducers({
    [fromState.stateFeatureKey]: fromState.reducer,
    [fromList.listPageFeatureKey]: fromList.reducer,
    [fromShow.showPageFeatureKey]: fromShow.reducer,
  })(state, action);
}

const selectTodosFeature = createFeatureSelector<TodosState>(todosFeatureKey);

const selectStateFeature = createSelector(
  selectTodosFeature,
  (state) => state.state
);

export const selectAllTodos = createSelector(
  selectStateFeature,
  (state) => state.todos
);

export const selectCurrentTodo = createSelector(
  selectStateFeature,
  (state) => state.current
);

export const selectListPage = createSelector(
  selectTodosFeature,
  (state) => state.listPage
);

export const selectShowPage = createSelector(
  selectTodosFeature,
  (state) => state.showPage
);
