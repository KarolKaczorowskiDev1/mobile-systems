import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserDataProviderService } from 'src/app/shared/services/user-data-provider.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  constructor(public userDataProvider: UserDataProviderService) {}
}
