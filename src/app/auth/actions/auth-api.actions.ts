import { props, createAction } from '@ngrx/store';

import { JwtTokens } from '../models';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ tokens: JwtTokens; }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any; }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success',
  props<{ tokens: JwtTokens; }>()
);

export const registerFailure = createAction(
  '[Auth/API] Register Failure',
  props<{ error: any; }>()
);

export const refreshSuccess = createAction(
  '[Auth/API] Refresh Success',
  props<{ tokens: JwtTokens; }>()
);

export const refreshFailure = createAction(
  '[Auth/API] Refresh Failure',
  props<{ error: any; }>()
);
