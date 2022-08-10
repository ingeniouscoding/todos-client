import { createAction, props } from "@ngrx/store";

import { LoginCredentials } from "../models";

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: LoginCredentials; }>()
);
