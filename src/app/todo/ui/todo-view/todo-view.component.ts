import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo, UpdateTodoDto } from '../../models';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
})
export class TodoViewComponent {
  @Input() todo!: Todo;
  @Output() check = new EventEmitter<UpdateTodoDto>();

  onCheck() {
    this.check.emit({
      id: this.todo.id,
      isComplete: !this.todo.isComplete,
    });
  }
}
