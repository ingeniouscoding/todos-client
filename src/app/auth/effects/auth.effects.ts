import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";

import {
  AuthApiActions,
  LoginPageActions,
  RegisterPageActions
} from "../actions";
import { AuthService } from "../services";

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterPageActions.register),
      map((action) => action.credentials),
      exhaustMap((credentials) =>
        this.authService.register(credentials)
          .pipe(
            map((tokens) => AuthApiActions.registerSuccess({ tokens })),
            catchError((err) =>
              of(AuthApiActions.registerFailure({ error: err.error })))
          )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerSuccess),
      map((action) => action.tokens),
      tap((tokens) => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((credentials) =>
        this.authService.login(credentials)
          .pipe(
            map((tokens) => AuthApiActions.loginSuccess({ tokens })),
            catchError((err) =>
              of(AuthApiActions.loginFailure({ error: err.error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      map((action) => action.tokens),
      tap((tokens) => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
