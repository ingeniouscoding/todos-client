import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
})
export class TodoViewComponent {
  @Input() todo!: Todo;
  @Output() complete = new EventEmitter<string>();
  @Output() uncomplete = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  onComplete() {
    this.complete.emit(this.todo.id);
  }

  onUncomplete() {
    this.uncomplete.emit(this.todo.id);
  }

  onRemove() {
    this.remove.emit(this.todo.id);
  }
}
