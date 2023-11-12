import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.scss'],
})
export class DeleteEntityComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
    private dialogRef: MatDialogRef<DeleteEntityComponent>
  ) {}
  deleteEntity() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close();
  }
}
