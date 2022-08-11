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
            catchError(({ error }) =>
              of(AuthApiActions.loginFailure({ error }))
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
          tokens,
        }));
      })
    ),
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => {
        const user = this.tokenService.getUser();
        const access_token = this.tokenService.getAccessToken();
        const refresh_token = this.tokenService.getRefreshToken();
        const tokens = (access_token !== null && refresh_token !== null)
          ? { access_token, refresh_token }
          : null;
        return of(AuthActions.setUser({
          user,
          tokens,
        }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }
}
