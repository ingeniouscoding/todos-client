import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LayoutModule } from 'src/app/layout/layout.module';
import {
  CreateTodoComponent,
  EditPageComponent,
  ListPageComponent,
  ShowContainerComponent,
  ShowPageComponent,
  TodoContainerComponent
} from './components';
import { TodoEffects } from './effects';
import * as fromTodos from './reducers';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoCardComponent, TodoViewComponent } from './ui';

@NgModule({
  declarations: [
    TodoContainerComponent,
    ShowContainerComponent,
    ListPageComponent,
    CreateTodoComponent,
    ShowPageComponent,
    TodoViewComponent,
    TodoCardComponent,
    EditPageComponent,
    CreateTodoComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromTodos.todosFeatureKey, fromTodos.reducers),
    EffectsModule.forFeature([TodoEffects]),
    LayoutModule,
  ],
})
export class TodoModule { }
