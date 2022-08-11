import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TodoActions } from '../../actions';

@Component({
  selector: 'app-todo-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  public fg = this.fb.group({
    content: '',
  });

  constructor(
    private store: Store,
    private fb: NonNullableFormBuilder
  ) { }

  onSave(): void {
    const dto = this.fg.getRawValue();
    if (dto.content) {
      this.store.dispatch(TodoActions.create({ dto }));
    }
  }
}
