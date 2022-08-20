import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap
} from "rxjs";

import { TodoActions, TodoApiActions } from "../actions";
import { TodoService } from "../services";

@Injectable()
export class TodoEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getAll),
      exhaustMap(() => this.todoService
        .getAll()
        .pipe(
          map((todos) => TodoApiActions.getAllSuccess({ todos })),
          catchError(({ error }) =>
            of(TodoApiActions.getAllFailure({ error }))
          )
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getById),
      switchMap(({ guid }) => this.todoService
        .getById(guid)
        .pipe(
          map((todo) => TodoApiActions.getByIdSuccess({ todo })),
          catchError(({ error }) =>
            of(TodoApiActions.getByIdFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      concatMap(({ dto }) => this.todoService
        .create(dto)
        .pipe(
          map(() => TodoApiActions.createSuccess({ guid: dto.guid })),
          catchError(({ error }) =>
            of(TodoApiActions.createFailure({ guid: dto.guid, error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TodoActions.update,
        TodoActions.complete
      ),
      mergeMap(({ dto, type }) => this.todoService
        .update(dto)
        .pipe(
          map((todo) => {
            if (type === TodoActions.complete.type) {
              return TodoApiActions.completeSuccess({ todo });
            }
            this.router.navigate(['todos', todo.guid]);
            return TodoApiActions.updateSuccess({ todo });
          }),
          catchError(({ error }) => {
            if (type === TodoActions.complete.type) {
              return of(TodoApiActions.completeFailure({
                guid: dto.guid,
                error,
              }));
            }
            return of(TodoApiActions.updateFailure({ guid: dto.guid, error }));
          })
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.remove),
      mergeMap(({ guid }) => this.todoService
        .remove(guid)
        .pipe(
          map(() => TodoApiActions.removeSuccess({ guid })),
          catchError(({ error }) =>
            of(TodoApiActions.removeFailure({ guid, error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private todoService: TodoService
  ) { }
}