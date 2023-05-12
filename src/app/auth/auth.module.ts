import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { SignInComponent } from 'src/app/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPasswordValidatorDirective } from 'src/app/shared/validators/confirm-password-validator.directive';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ConfirmPasswordValidatorDirective,
  ]
})
export class AuthModule { }
