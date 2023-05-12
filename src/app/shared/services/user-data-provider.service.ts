import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { UserService } from './user.service';
import { Role } from '../model/enums/role';

@Injectable({
  providedIn: 'root'
})
export class UserDataProviderService {

  private userInfo = new BehaviorSubject<User | null>(null);
  userInfo$ = this.userInfo.asObservable();

  isAdmin$ = this.userInfo.pipe(
    map(userInfo => {
      return userInfo ? userInfo.role === Role.ADMIN : false;
    })
  )

  isLoggedIn$ = this.userInfo.pipe(
    map(userInfo => !!userInfo),
  );

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) { 
    this.subscribeToAuthStatusChange();
  }

  getUserInfo(): User | null {
    return this.userInfo.getValue();
  }

  private subscribeToAuthStatusChange(): void {
    this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.docByUid(user.uid);
        }

        return of(null);
      })
    ).subscribe(user => {
      this.userInfo.next(user);
    })
  }

}
