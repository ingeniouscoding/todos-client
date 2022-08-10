import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '@todos/app.state';
import * as fromStatus from './status.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromRegisterPage from './register-page.reducer';

export const authFeatureKey = 'authentication';

export interface AuthState {
  [fromStatus.statusFeatureKey]: fromStatus.State,
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State,
  [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.State,
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState,
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
    [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.reducer,
  })(state, action);
}

const selectAuthStateFeature =
  createFeatureSelector<AuthState>(authFeatureKey);

const selectAuthStatusState = createSelector(
  selectAuthStateFeature,
  (state) => state.status
);

export const selectIsAuthenticated = createSelector(
  selectAuthStatusState,
  (state) => state.isAuthenticated
);
