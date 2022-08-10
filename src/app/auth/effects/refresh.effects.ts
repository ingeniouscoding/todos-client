import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthActions, AuthApiActions } from '../actions';
import { AuthService, TokenService } from '../services';

@Injectable()
export class RefreshEffects {
  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      exhaustMap(() =>
        this.authService
          .refresh(this.tokenService.getRefreshToken() ?? '')
          .pipe(
            map((tokens) => AuthApiActions.refreshSuccess({ tokens })),
            catchError((err) => {
              if (err instanceof HttpErrorResponse && err.status === 403) {
                return of(AuthActions.forceLogout());
              }
              return of(AuthApiActions.refreshFailure({ error: err.error }));
            })
          )
      )
    )
  );

  refreshSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.refreshSuccess),
      tap(({ tokens }) => this.tokenService.saveTokens(tokens))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }
}
