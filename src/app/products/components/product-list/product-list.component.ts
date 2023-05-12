import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserDataProviderService } from 'src/app/shared/services/user-data-provider.service';
import { Product } from '../../model/product';
import { MatDialog } from '@angular/material/dialog';
import { SelectSizeModalComponent } from 'src/app/shared/components/select-size-modal/select-size-modal.component';
import { Size } from '../../model/enums/size';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  products$: Observable<Product[]> = of([]);
  // products$ = this.route.queryParams.pipe(
  //   switchMap(params => {
  //     const { category, gender } = params;

  //     return this.productService.getProductsList({
  //       category: category?.toUpperCase(),
  //       gender: gender?.toUpperCase(),
  //     })
  //   })
  // )
  
  constructor(
    private productService: ProductService, 
    public userDataProvider: UserDataProviderService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private dialog: MatDialog,
  ) { }

  addProductToCart(product: Product): void {
    const dialogRef = this.dialog.open(SelectSizeModalComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((selectedSize?: Size) => {
      if (selectedSize) {
        this.cartService.add(product, selectedSize);
      }
    })
  }

  deleteProduct(productId: string) {
    this.productService.delete(productId).subscribe();
  }
}
