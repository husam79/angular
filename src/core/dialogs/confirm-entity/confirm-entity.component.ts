import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-entity',
  templateUrl: './confirm-entity.component.html',
  styleUrls: ['./confirm-entity.component.scss'],
})
export class ConfirmEntityComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
    private dialogRef: MatDialogRef<ConfirmEntityComponent>
  ) {}
  deleteEntity() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close();
  }
}
