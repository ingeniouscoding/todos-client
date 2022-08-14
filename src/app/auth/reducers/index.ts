import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from 'src/app/app.state';
import * as fromLoginPage from './login-page.reducer';
import * as fromRegisterPage from './register-page.reducer';
import * as fromState from './state.reducer';

export const authFeatureKey = 'authentication';

export interface AuthState {
  [fromState.stateFeatureKey]: fromState.State,
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State,
  [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.State,
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState,
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromState.stateFeatureKey]: fromState.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
    [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.reducer,
  })(state, action);
}

const selectAuthFeature = createFeatureSelector<AuthState>(authFeatureKey);

const selectStateFeature = createSelector(
  selectAuthFeature,
  (state) => state.state
);

export const selectIsAuthenticated = createSelector(
  selectStateFeature,
  (state) => state.isAuthenticated
);

export const selectTokens = createSelector(
  selectStateFeature,
  (state) => state.tokens,
);
