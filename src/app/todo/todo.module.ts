import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LayoutModule } from '@todos/layout/layout.module';
import {
  CreatePageComponent,
  EditPageComponent,
  ListPageComponent,
  ShowContainerComponent,
  ShowPageComponent,
  TodoContainerComponent,
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
    CreatePageComponent,
    ShowPageComponent,
    TodoViewComponent,
    TodoCardComponent,
    EditPageComponent,
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
