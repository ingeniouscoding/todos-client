import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
})
export class CoreModule { }
