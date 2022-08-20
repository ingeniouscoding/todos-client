import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

import { TodoActions } from '../../actions';

@Component({
  selector: 'app-todo-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  public fg = this.fb.group({
    content: '',
  });

  constructor(
    private store: Store,
    private fb: NonNullableFormBuilder
  ) { }

  onSave(): void {
    const form = this.fg.getRawValue();
    if (form.content) {
      const guid = uuidv4();
      const dto = { ...form, guid };
      this.store.dispatch(TodoActions.create({ dto }));
      this.fg.reset();
    }
  }
}
