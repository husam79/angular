import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../components/notifier/notifier.component';
// import { NotifierComponent } from '../components/notifier/notifier.component';
@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snakeBar: MatSnackBar) {}
  showNotification(
    displayedMessage: string,
    status: 'warning' | 'error' | 'info' = 'warning'
  ) {
    this.snakeBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayedMessage,
        type: status,
      },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [status + '-snackbar'],
    });
  }
  dismiss() {
    this.snakeBar.dismiss();
  }
}
