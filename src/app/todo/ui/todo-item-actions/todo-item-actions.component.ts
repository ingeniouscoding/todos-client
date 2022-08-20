import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item-actions',
  templateUrl: './todo-item-actions.component.html',
  styleUrls: ['./todo-item-actions.component.scss'],
})
export class TodoItemActionsComponent {
  @Input() isComplete!: boolean;
  @Output() complete = new EventEmitter<void>();
  @Output() uncomplete = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  onCheck() {
    if (this.isComplete) {
      this.uncomplete.emit();
    } else {
      this.complete.emit();
    }
  }

  onRemove() {
    this.remove.emit();
  }
}
