import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from '../model/enums/role';
import { UserDataProviderService } from '../services/user-data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userDataProvider: UserDataProviderService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = route.data['role'] as Role;
    
    return this.userDataProvider.userInfo$.pipe(
      map(userInfo => {
        if (userInfo?.role === role) {
          return true
        }

        return this.router.createUrlTree(['/products'])
      })
    )
  }
  
}
