import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { Role } from '../shared/model/enums/role';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'new',
    component: ProductEditComponent,
    canActivate: [RoleGuard],
    data: {
      role: Role.ADMIN
    }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    canActivate: [RoleGuard],
    data: {
      role: Role.ADMIN
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
