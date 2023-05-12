import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmPasswordValidatorDirective } from 'src/app/shared/validators/confirm-password-validator.directive';

interface SignUpForm {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  confirmPassword: FormControl<string | null>,
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {

  form = this.getInitialForm();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  private getInitialForm(): FormGroup<SignUpForm> {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    const confirmPasswordValidator = ConfirmPasswordValidatorDirective.createValidator(
      form.controls['password'],
      form.controls['confirmPassword'],
    )

    form.controls['confirmPassword'].addValidators(confirmPasswordValidator);

    return form;
  }

  signUp(): void {
    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.signUp(email, password).subscribe();
    }
  }

}
