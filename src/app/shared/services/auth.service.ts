import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EMPTY, Observable, from, of, switchMap, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { Role } from 'src/app/shared/model/enums/role';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private fireAuth: AngularFireAuth, 
    private router: Router, 
    private userService: UserService  
  ) { }

  signIn(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => {
        this.router.navigate(['/']);
      })
    );
  }

  signUp(email: string, password: string): Observable<void> {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((user) => this.handleUserCreation(user)),
      tap(() => {
        this.router.navigate(['/']);
      })
    );
  }

  signInWithPopup(provider: firebase.auth.AuthProvider): Observable<void> {
    return from(this.fireAuth.signInWithPopup(provider)).pipe(
      switchMap((user) => this.handleUserCreation(user)),
      tap(() => {
        this.router.navigate(['/']);
      })
    )
  }

  signOut(): Observable<void> {
    return from(this.fireAuth.signOut()).pipe(
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
      })
    )
  }

  private handleUserCreation(userCredentials: firebase.auth.UserCredential): Observable<void> {
    if (userCredentials.user?.email) {
      const user: User = {
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
        role: Role.CLIENT,
      }

      return this.userService.create(user);
    }

    return EMPTY;
  }
}
