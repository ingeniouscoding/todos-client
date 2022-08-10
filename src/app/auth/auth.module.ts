import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent, RegisterPageComponent } from './components';
import { effects } from './effects';
import * as fromAuth from './reducers';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class AuthModule { }
