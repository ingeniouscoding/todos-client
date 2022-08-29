import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestCanActivateGuard } from 'src/app/global/auth/guards';
import { LoginPageComponent, RegisterPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestCanActivateGuard],
    children:
      [
        {
          path: 'login',
          component: LoginPageComponent,
        },
        {
          path: 'register',
          component: RegisterPageComponent,
        },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthUiRoutingModule { }
