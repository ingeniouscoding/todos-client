import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";

import { TodoActions, TodoApiActions } from "../actions";
import { TodoService } from "../services";

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
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

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      concatMap(({ dto }) => this.todoService
        .create(dto)
        .pipe(
          map((todo) => TodoApiActions.createSuccess({ todo })),
          catchError(({ error }) =>
            of(TodoApiActions.createFailure({ error }))
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.remove),
      mergeMap(({ id }) => this.todoService
        .remove(id)
        .pipe(
          map(() => TodoApiActions.removeSuccess({ id })),
          catchError(({ error }) =>
            of(TodoApiActions.removeFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }
}