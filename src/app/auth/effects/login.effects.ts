import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import { AuthActions, AuthApiActions, LoginPageActions } from '../actions';
import { JwtPayload } from '../models';
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
      tap(({ tokens }) => {
        this.tokenService.saveTokens(tokens);
        this.router.navigate(['home']);
      })
    ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => {
        const token = this.tokenService.getRefreshToken();
        const user = token !== null
          ? JSON.parse(window.atob(token.split('.')[1])) as JwtPayload
          : null;
        return of(AuthActions.setUser({ user }));
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
