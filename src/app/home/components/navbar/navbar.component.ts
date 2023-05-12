import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/products/model/enums/category';
import { Size } from 'src/app/products/model/enums/size';
import { Product } from 'src/app/products/model/product';
import { Gender } from 'src/app/shared/model/enums/gender';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDataProviderService } from 'src/app/shared/services/user-data-provider.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  
  readonly categories = Object.values(Category);
  readonly destinations = Object.values(Gender);
  readonly sizes = Object.values(Size);

  queryParams$ = this.route.queryParams;

  constructor (
    public userDataProvider: UserDataProviderService, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  signOut(): void {
    this.authService.signOut().subscribe();
  }

  applyFilters(queryParams: Params, params: Partial<Product>): void {
    this.router.navigate(['/products'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        ...queryParams,
        ...params,
      }
    });
  }
}
