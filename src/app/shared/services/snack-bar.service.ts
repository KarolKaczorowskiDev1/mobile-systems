import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action?: string, duration = 2000): void {
    const snackBarRef = this.snackBar.open(message, action);

    setTimeout(() => {
      snackBarRef.dismiss();
    }, duration)
  }
}
