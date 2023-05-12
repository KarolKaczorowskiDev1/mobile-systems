import { Injectable } from '@angular/core';
import {  CanLoad, UrlTree } from '@angular/router';
import { Observable, combineLatest, map, skip } from 'rxjs';
import { UserDataProviderService } from '../services/user-data-provider.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private userDataProvider: UserDataProviderService, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.userDataProvider.isLoggedIn$.pipe(skip(1)),
    ]).pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        return this.router.createUrlTree(['/products']);
      })
    );
  }
  
}
