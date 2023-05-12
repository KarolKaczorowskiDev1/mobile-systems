import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/shared/model/firestore-service';
import { Product } from 'src/app/products/model/product';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends FirestoreService<Product> {
  protected override basePath: string = 'product';

  constructor(firestore: AngularFirestore) {
    super(firestore);
  }

  getProductsList(params: Partial<Product> = {}): Observable<Product[]> {
    let productQuery = this.collection.ref.orderBy('name');

    if (params.category) {
      productQuery = productQuery.where(
        'category',
        '==',
        params.category.toUpperCase()
      );
    }

    if (params.gender) {
      productQuery = productQuery.where(
        'gender',
        '==',
        params.gender.toUpperCase()
      );
    }

    return collectionData(query(productQuery), { idField: 'id', });
  }
}
