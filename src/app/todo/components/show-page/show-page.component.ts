import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoActions } from '../../actions';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.scss'],
})
export class ShowPageComponent {
  public todo$ = this.store.select(fromTodos.selectCurrentTodo);

  constructor(private store: Store) { }

  onComplete(id: string) {
    this.store.dispatch(TodoActions.complete({ id }));
  }

  onUncomplete(id: string) {
    this.store.dispatch(TodoActions.uncomplete({ id }));
  }

  onRemove(id: string) {
    this.store.dispatch(TodoActions.remove({ id }));
  }
}
