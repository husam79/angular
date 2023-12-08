import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.dialog.html',
  styleUrls: ['./transaction.dialog.scss'],
})
export class TransactionDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string },
    private dialogRef: MatDialogRef<TransactionDialog>
  ) {}
  catchData(e: any) {
    this.dialogRef.close(e);
  }
  close(e: any) {
    this.dialogRef.close();
  }
}
