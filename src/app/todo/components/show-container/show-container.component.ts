import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { TodoActions } from '../../actions';
import * as fromTodos from '../../reducers';

@Component({
  selector: 'app-todo-show-container',
  templateUrl: './show-container.component.html',
  styleUrls: ['./show-container.component.scss'],
})
export class ShowContainerComponent implements OnInit {
  private todo$ = this.store.select(fromTodos.selectCurrentTodo);
  private page$ = this.store.select(fromTodos.selectShowPage);

  public vm$ = combineLatest([this.todo$, this.page$])
    .pipe(
      map(([todo, page]) => ({ todo, page }))
    );

  private id: string;

  constructor(private store: Store, route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.getById({ id: this.id }));
  }

}
