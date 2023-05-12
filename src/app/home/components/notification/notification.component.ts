import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessagingNotification } from 'src/app/shared/model/messaging-notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  // @Input() notification!: Notification;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public notification: MessagingNotification) {}

}
