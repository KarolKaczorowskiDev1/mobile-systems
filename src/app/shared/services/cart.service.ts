import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/app/products/model/product';
import { CartProduct } from '../model/cart-product';
import { Size } from 'src/app/products/model/enums/size';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products = new BehaviorSubject<CartProduct[]>([]);
  products$ = this.products.asObservable();

  totalPrice$ = this.products$.pipe(
    map(products => products.reduce((acc, curr) => acc + (curr.price * curr.amount), 0)),
  )

  constructor(private snackBar: MatSnackBar) { }

  add(newProduct: Product, size: Size): void {
    const products = [...this.products.getValue()];
    const editedProduct = products.find(cartProduct => cartProduct.id === newProduct.id && cartProduct.size === size);

    if (editedProduct) {
      editedProduct.amount++;
    } else {
      products.push(new CartProduct(newProduct, size));
    }

    this.snackBar.open('Succesfuly added product to cart!', 'Got it!', { duration: 2000, });

    this.products.next(products);
  }

  remove(cartProduct: CartProduct): void {
    const products = [...this.products.getValue()];
    const editedProductIndex = products.findIndex(product => product.id === cartProduct.id && product.size === cartProduct.size);

    if (editedProductIndex >= 0) {
      products[editedProductIndex] = { ...products[editedProductIndex], amount: products[editedProductIndex].amount - 1 };

      if (products[editedProductIndex].amount === 0) {
        products.splice(editedProductIndex, 1);
      }
    }

    this.snackBar.open('Succesfuly removed product from cart!', 'Got it!', { duration: 2000, });
   
    this.products.next(products);
  }

}
