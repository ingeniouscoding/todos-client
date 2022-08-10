import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthActions, AuthApiActions } from '../actions';
import { AuthService, TokenService } from '../services';

@Injectable()
export class LogoutEffects {
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService
          .logout(this.tokenService.getRefreshToken() ?? '')
          .pipe(
            map(() => AuthApiActions.logoutSuccess()),
            catchError((err) => {
              if (err instanceof HttpErrorResponse && err.status === 403) {
                return of(AuthActions.forceLogout());
              }
              return of(AuthApiActions.logoutFailure({ error: err.error }));
            })
          )
      )
    )
  );

  forceLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forceLogout),
      tap(() => {
        this.tokenService.removeTokens();
        this.router.navigate(['login']);
      })
    ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logoutSuccess),
      tap(() => {
        this.tokenService.removeTokens();
        this.router.navigate(['home']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }
}
