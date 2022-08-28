import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects';
import { authorizationInterceptorProvider } from './interceptors';
import * as fromAuth from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    authorizationInterceptorProvider,
  ],
})
export class AuthModule { }
