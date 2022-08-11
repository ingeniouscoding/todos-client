import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoActions } from '../../actions';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  public todos$ = this.store.select(fromTodos.selectTodos);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.getAll());
  }

  onDelete(id: string) {
    this.store.dispatch(TodoActions.remove({ id }));
  }
}
