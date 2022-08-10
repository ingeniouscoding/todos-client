import { createAction, props } from "@ngrx/store";

import { RegisterCredentials } from "../models";

export const register = createAction(
  '[Register Page] Register New User',
  props<{ credentials: RegisterCredentials; }>()
);
