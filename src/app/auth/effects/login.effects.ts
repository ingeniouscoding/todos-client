import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { AuthActions, AuthApiActions, LoginPageActions } from '../actions';
import { AuthService, TokenService } from '../services';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      exhaustMap(({ credentials }) =>
        this.authService
          .login(credentials)
          .pipe(
            map((tokens) => AuthApiActions.loginSuccess({ tokens })),
            catchError((err) =>
              of(AuthApiActions.loginFailure({ error: err.error }))
            )
          )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      switchMap(({ tokens }) => {
        this.tokenService.saveTokens(tokens);
        this.router.navigate(['home']);
        return of(AuthActions.setUser({
          user: this.tokenService.getUser(tokens.refresh_token),
        }));
      })
    ),
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => of(AuthActions.setUser({
        user: this.tokenService.getUser(),
      })))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }
}
