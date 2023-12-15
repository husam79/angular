import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppTranslate } from 'src/core/constant/translation';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
  styleUrls: ['./form-inventory.component.scss'],
})
export class FormInventoryComponent {
  accessTranslation = AppTranslate.Inventories;
  storeTypes = ['raw-material', 'final-product'];
  formGroup: UntypedFormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormInventoryComponent>,
    private storeService: StoreService
  ) {
    this.formGroup = fb.group({
      id: fb.control(null),
      name: fb.control('', [Validators.required]),
      code: fb.control(''),
      location: fb.control(''),
      store_type: fb.control('', [Validators.required]),
    });
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }
  save() {
    if (this.formGroup.invalid) return;
    if (!this.data) {
      let value = this.formGroup.value;
      delete value['id'];
      this.storeService.addStore(this.formGroup.value).subscribe((data) => {
        this.dialogRef.close({ ...this.formGroup.value, id: data.msg });
      });
    } else {
      this.storeService
        .editStore(this.formGroup.value)
        .subscribe((data: any) => {
          this.dialogRef.close(this.formGroup.value);
        });
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
