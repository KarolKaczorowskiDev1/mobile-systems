import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessagingNotification } from 'src/app/shared/model/messaging-notification';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  private subscribeToNotifications(): void {
    this.notificationService.notifications.subscribe(notification => {
      
      if (notification) {
        this.handleIncomingNotification(notification);
      }
    })
    
  }

  private handleIncomingNotification(notification: MessagingNotification): void {
    const audio = new Audio('assets/audio/notification.wav');

    audio.load();
    audio.play();

    navigator.vibrate(1000);

    this.snackBar.openFromComponent(NotificationComponent, {
      data: notification,
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
