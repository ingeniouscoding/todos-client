import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from 'src/app/global/layout/layout.module';
import { HomePageComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
  ],
})
export class HomeModule { }
