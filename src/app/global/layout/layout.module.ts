import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BasicComponent } from './components';

@NgModule({
  declarations: [
    BasicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BasicComponent,
  ],
})
export class LayoutModule { }
