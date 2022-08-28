import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthActions, AuthApiActions } from '../actions';

import * as fromAuth from '../reducers';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private tokens$ = this.store.select(fromAuth.selectTokens);

  constructor(private store: Store, private actions$: Actions) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    const isRefreshUrl = request.url.endsWith('/auth/token');

    return this.tokens$.pipe(
      take(1),
      switchMap((tokens) => {
        if (tokens !== null) {
          request = this.setAuthHeader(request, tokens.access_token);
        }
        return next.handle(request);
      }),
      catchError((err) => this.tokens$.pipe(
        take(1),
        switchMap((token) => {
          if (
            token !== null
            && err instanceof HttpErrorResponse
            && err.status === 401
            && !isRefreshUrl
          ) {
            return this.handle401Error(request, next, err);
          }
          return throwError(() => err);
        })
      )
      )
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    this.store.dispatch(AuthActions.refresh());

    return this.actions$.pipe(
      ofType(
        AuthApiActions.refreshSuccess,
        AuthApiActions.refreshFailure
      ),
      take(1),
      switchMap((action) => {
        if (action.type === AuthApiActions.refreshSuccess.type) {
          const accessToken = action.tokens.access_token;
          request = this.setAuthHeader(request, accessToken);
          return next.handle(request);
        }
        return throwError(() => err);
      })
    );
  }

  private setAuthHeader(request: HttpRequest<unknown>, accessToken: string)
    : HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export const authorizationInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationInterceptor,
  multi: true,
};
