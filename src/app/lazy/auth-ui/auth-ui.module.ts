import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthUiRoutingModule } from './auth-ui-routing.module';
import { LoginPageComponent, RegisterPageComponent } from './components';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthUiRoutingModule
  ]
})
export class AuthUiModule { }
