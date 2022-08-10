import { props, createAction } from '@ngrx/store';

export const logout = createAction(
  '[Auth] Logout',
  props<{ token: string; }>()
);

export const refresh = createAction(
  '[Auth] Refresh token',
  props<{ token: string; }>()
);
