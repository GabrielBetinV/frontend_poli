import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class HomeModule { }
