import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo, UpdateTodoDto } from '../../models';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {
  @Input() todo!: Todo;
  @Output() check = new EventEmitter<UpdateTodoDto>();
  @Output() remove = new EventEmitter<string>();

  onCheck() {
    this.check.emit({
      guid: this.todo.guid,
      isComplete: !this.todo.isComplete,
    });
  }

  onRemove() {
    this.remove.emit(this.todo.guid);
  }
}
