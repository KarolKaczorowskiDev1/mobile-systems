import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from 'src/app/products/products-routing.module';
import { ProductListComponent } from 'src/app/products/components/product-list/product-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductComponent } from '../shared/components/product/product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ScrollingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ProductComponent,
  ]
})
export class ProductsModule { }
