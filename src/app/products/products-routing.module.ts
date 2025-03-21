import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { UpdateInventoryComponent } from './pages/update-inventory/update-inventory.component';

const routes: Routes = [
   { path: 'admin', component: AdminComponent },
   { path: 'viewer', component: ViewerComponent },
   { path: 'inventory', component: UpdateInventoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
