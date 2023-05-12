import { ErrorHandler } from '@angular/core';
import { FirebaseError } from 'firebase/app';

export class GlobalErrorHandler implements ErrorHandler {
  private readonly errorCodesToDisplay: string[] = [];

  handleError(error: Error): void {
    if (error instanceof FirebaseError && this.shouldDisplayFirebaseError(error)) {
      if (this.shouldDisplayFirebaseError(error)) {
        // TODO: display modal or something
        console.error(error.message);
      }
    } else {
      // TODO: display modal or something
      console.error(error);
    }
  }

  private shouldDisplayFirebaseError(error: FirebaseError): boolean {
    if (this.errorCodesToDisplay.includes(error.code)) {
      return true;
    }

    return false;
  }
}
