import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { TodoActions } from '../../actions';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
  public fg = this.fb.group({
    guid: '',
    content: '',
    isComplete: false,
  });

  public todo$ = this.store.select(fromTodos.selectCurrentTodo)
    .pipe(
      tap((todo) => {
        if (todo !== null && !todo.isPending) {
          this.fg.controls.guid.setValue(todo.guid);
          this.fg.controls.content.setValue(todo.content);
          this.fg.controls.isComplete.setValue(todo.isComplete);
        }
      })
    );

  constructor(private store: Store, private fb: NonNullableFormBuilder) { }

  onUpdate() {
    const dto = this.fg.getRawValue();
    this.store.dispatch(TodoActions.update({ dto }));
  }
}
