import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Observable, combineLatest, filter, map, of, switchMap } from 'rxjs';
import { UserDataProviderService } from './user-data-provider.service';
import { MessagingNotification } from '../model/messaging-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Observable<MessagingNotification | null> = combineLatest([
    this.userDataProvider.isLoggedIn$,
    this.userDataProvider.isAdmin$,
    this.messaging.requestPermission,
    this.messaging.getToken,
  ]).pipe(
    switchMap(([isLoggedIn, isAdmin,  requestPermission, token]) => {
      if (isLoggedIn && !isAdmin && requestPermission === 'granted' && token) {
        return this.messaging.messages.pipe(
          map(({ notification }) => ({ title: notification?.title, image: notification?.image, body: notification?.body })),
        )
      }

      return of(null);
    })
  )

  constructor(private messaging: AngularFireMessaging, private userDataProvider: UserDataProviderService) { }



}
