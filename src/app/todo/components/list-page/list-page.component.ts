import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { TodoActions } from '../../actions';
import { UpdateTodoDto } from '../../models';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  private todos$ = this.store.select(fromTodos.selectAllTodos);
  private page$ = this.store.select(fromTodos.selectListPage);

  public vm$ = combineLatest([this.todos$, this.page$])
    .pipe(
      map(([todos, page]) => ({ todos, page }))
    );

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.getAll());
  }

  onCheck(dto: UpdateTodoDto) {
    this.store.dispatch(TodoActions.complete({ dto }));
  }

  onRemove(guid: string) {
    this.store.dispatch(TodoActions.remove({ guid }));
  }
}
