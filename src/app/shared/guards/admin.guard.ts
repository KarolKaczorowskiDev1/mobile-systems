import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserDataProviderService } from '../services/user-data-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userDataProvider: UserDataProviderService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userDataProvider.isAdmin$.pipe(
      map((isAdmin) => {
        return isAdmin || this.router.createUrlTree(['/products']);
      })
    );
  }
}
