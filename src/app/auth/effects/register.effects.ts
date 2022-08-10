import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthApiActions, RegisterPageActions } from '../actions';
import { AuthService, TokenService } from '../services';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterPageActions.register),
      exhaustMap(({ credentials }) =>
        this.authService
          .register(credentials)
          .pipe(
            map((tokens) => AuthApiActions.registerSuccess({ tokens })),
            catchError((err) =>
              of(AuthApiActions.registerFailure({ error: err.error }))
            )
          )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerSuccess),
      tap(({ tokens }) => {
        this.tokenService.saveTokens(tokens);
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
