import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CreatePageComponent,
  ListPageComponent,
  ShowTodoComponent,
  TodoContainerComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: TodoContainerComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
        title: 'Todos | List',
      },
      {
        path: 'create',
        component: CreatePageComponent,
        title: 'Todos | Create',
      },
      {
        path: ':id',
        component: ShowTodoComponent,
        title: 'Todos | Show',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule { }
