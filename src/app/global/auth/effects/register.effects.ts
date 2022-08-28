import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { AuthActions, AuthApiActions, RegisterPageActions } from '../actions';
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
            catchError(({ error }) =>
              of(AuthApiActions.registerFailure({ error }))
            )
          )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerSuccess),
      switchMap(({ tokens }) => {
        this.tokenService.saveTokens(tokens);
        this.router.navigate(['home']);
        return of(AuthActions.setUser({
          user: this.tokenService.getUser(tokens.refresh_token),
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
