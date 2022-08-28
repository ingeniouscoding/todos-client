import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { TodoActions } from '../../actions';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
  public fg = this.fb.group({
    id: '',
    content: '',
  });

  public todo$ = this.store.select(fromTodos.selectCurrentTodo)
    .pipe(
      filter((todo) => !todo?.isPending),
      tap((todo) => {
        this.fg.controls.id.setValue(todo!.id);
        this.fg.controls.content.setValue(todo!.content);
      })
    );

  constructor(private store: Store, private fb: NonNullableFormBuilder) { }

  onUpdate() {
    const dto = this.fg.getRawValue();
    this.store.dispatch(TodoActions.update({ dto }));
  }
}
