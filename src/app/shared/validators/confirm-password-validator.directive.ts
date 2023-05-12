import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmPasswordValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordValidatorDirective,
      multi: true,
    }
  ]
})
export class ConfirmPasswordValidatorDirective implements Validator {

  @Input('appConfirmPasswordValidatorParentControl') parentControl?: AbstractControl;

  constructor() { }

  static createValidator(control: AbstractControl, parentControl: AbstractControl): () => ValidationErrors | null {
    return () => ConfirmPasswordValidatorDirective._validate(control, parentControl);
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return ConfirmPasswordValidatorDirective._validate(control, this.parentControl);
  }

  private static _validate(control: AbstractControl, parentControl?: AbstractControl): ValidationErrors | null {
    if (parentControl?.value === control.value) {
      return null
    }

    return {
      confirmPassword: true,
    }
  }

}
