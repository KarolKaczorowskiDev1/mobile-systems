import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartProduct } from 'src/app/shared/model/cart-product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  
  constructor(public cartService: CartService) {}

  addProduct(product: CartProduct): void {
    this.cartService.add(product, product.size);
  }

  removeProduct(product: CartProduct): void {
    this.cartService.remove(product);
  }

}
