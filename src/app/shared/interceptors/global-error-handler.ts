import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from 'firebase/app';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly errorCodesToDisplay: string[] = [];

  constructor(private snackBar: MatSnackBar) {}
  
  handleError(error: Error): void {
    if (error instanceof FirebaseError) {;
        this.snackBar.open(error.message, 'Try again', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' })
    } else {
      this.snackBar.open('An unexpected error occured!', 'Try again', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' });
    }
  }

  private shouldDisplayFirebaseError(error: FirebaseError): boolean {
    if (this.errorCodesToDisplay.includes(error.code)) {
      return true;
    }

    return false;
  }
}
