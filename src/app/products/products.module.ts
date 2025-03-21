import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { UpdateInventoryComponent } from './pages/update-inventory/update-inventory.component';


@NgModule({
  declarations: [
    AdminComponent,
    ViewerComponent,
    UpdateInventoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
