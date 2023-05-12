import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Observable, combineLatest, map } from 'rxjs';
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
    this.messaging.messages,
  ]).pipe(
    map(([isLoggedIn, isAdmin, requestPermission, token, { notification }]) => {
      if (isLoggedIn && !isAdmin && requestPermission === 'granted' && token && notification) {
        return { title: notification?.title, image: notification?.image, body: notification?.body }
      }

      return null;
    })
  )

  constructor(private messaging: AngularFireMessaging, private userDataProvider: UserDataProviderService) { }



}
