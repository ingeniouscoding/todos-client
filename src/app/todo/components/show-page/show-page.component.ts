import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoActions } from '../../actions';
import { UpdateTodoDto } from '../../models';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.scss'],
})
export class ShowPageComponent {
  public todo$ = this.store.select(fromTodos.selectCurrentTodo);

  constructor(private store: Store) { }

  onCheck(dto: UpdateTodoDto) {
    this.store.dispatch(TodoActions.update({ dto }));
  }
}
