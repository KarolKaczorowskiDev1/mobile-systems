import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { map } from 'rxjs';
import { UserDataProviderService } from 'src/app/shared/services/user-data-provider.service';
import { UserWebcamComponent } from '../user-webcam/user-webcam.component';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/model/user';

interface UserEditForm {
  id: FormControl<string | null>,
  email: FormControl<string | null>;
  role: FormControl<string | null>;
  photoUrl: FormControl<string | null>;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent {
  
  userDetails$ = this.userDataProvider.userInfo$.pipe(
    map(user => {
      this.form.patchValue({
        email: user?.email,
        role: user?.role,
        photoUrl: '',
      })

      return user;
    })
  )

  form: FormGroup<UserEditForm> = this.fb.group({
    id: [{ value: '', validators: [Validators.required], disabled: true, }],
    email: [{ value: '', validators: [Validators.email, Validators.required], disabled: true, }],
    role: [{ value: '', validators: [Validators.required], disabled: true }],
    photoUrl: [''],
  })
  
  constructor(
    private fb: FormBuilder, 
    private userDataProvider: UserDataProviderService, 
    private dialog: MatDialog,
    private userService: UserService,  
  ) {}

  triggerWebcam(user: User): void {
    const modalRef = this.dialog.open(UserWebcamComponent);
    
    modalRef.afterClosed().subscribe((image: WebcamImage | undefined) => {
      if (image) {
        this.userService.uploadProfilePicture(image, user);
      }
    })
  }

}