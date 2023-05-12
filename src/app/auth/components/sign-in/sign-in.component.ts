import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

interface SignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  form: FormGroup<SignInForm> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  signIn(): void {
    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.signIn(email, password).subscribe();
    }
  }

  signInWithGoogle(): void {
    this.authService.signInWithPopup(new GoogleAuthProvider()).subscribe();
  }

}
