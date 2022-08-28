import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
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
