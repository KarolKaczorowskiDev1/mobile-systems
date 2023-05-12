import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private notificationService: NotificationService, private snackbarService: SnackBarService) {
    this.subscribeToNotifications();
  }

  private subscribeToNotifications(): void {
    this.notificationService.notifications.subscribe(notification => {
      this.snackbarService.show(notification?.body || '', 'Got it!', 10000);
      // if ()
    })
  }
}
