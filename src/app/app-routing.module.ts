import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./lazy/home/home.module')
      .then((m) => m.HomeModule),
  },
  {
    path: 'todos',
    loadChildren: () => import('./lazy/todo/todo.module')
      .then(m => m.TodoModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./lazy/auth-ui/auth-ui.module')
      .then((m) => m.AuthUiModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
