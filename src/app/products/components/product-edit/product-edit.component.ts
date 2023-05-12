import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/products/model/product';
import { Gender } from 'src/app/shared/model/enums/gender';
import { Category } from 'src/app/products/model/enums/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';

interface ProductForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  gender: FormControl<Gender | null>;
  price: FormControl<number | null>;
  category: FormControl<Category | null>;
  photoUrl: FormControl<string | null>;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent {
  readonly destinations = Object.values(Gender);
  readonly categories = Object.values(Category);

  queryParamsData$ = this.route.params.pipe(
    switchMap((params) => {
      const productId = params['id'];

      if (productId) {
        return this.productService.getDoc(productId);
      }

      return of(null);
    }),
    map((product) => {
      this.updateForm(product);

      return { product };
    })
  );

  form: FormGroup<ProductForm> = this.getInitialForm();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  saveProduct(originalProduct?: Product | null): void {
    this.createOrUpdateProduct(originalProduct).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  private createOrUpdateProduct(originalProduct?: Product | null): Observable<void> {
    if (originalProduct) {
      return this.productService.update(
        {
          ...originalProduct,
          ...(this.form.value as Partial<Product>),
        },
        originalProduct.id!
      );
    }

    return this.productService.create({
      availableSizes: [],
      photoUrl: this.form.value.photoUrl as string,
      category: this.form.value.category as Category,
      gender: this.form.value.gender as Gender,
      name: this.form.value.name as string,
      price: this.form.value.price as number,
    });
  }

  private updateForm(product?: Product | null) {
    if (product) {
      this.form.patchValue({
        ...product,
      });
    } else {
      this.form.reset();
    }
  }

  private getInitialForm(): FormGroup<ProductForm> {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      gender: [Gender.MALE, [Validators.required]],
      price: [1, [Validators.required, Validators.min(1)]],
      category: [Category.COATS, [Validators.required]],
      photoUrl: ['', [Validators.required]],
    });
  }
}
