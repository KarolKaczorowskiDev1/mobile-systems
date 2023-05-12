import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { WebcamModule } from 'ngx-webcam';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UserWebcamComponent } from './components/user-webcam/user-webcam.component';


@NgModule({
  declarations: [
    SettingsComponent,
    UserEditComponent,
    UserWebcamComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    WebcamModule,
    MatDialogModule,
    MatInputModule,
  ]
})
export class SettingsModule { }
