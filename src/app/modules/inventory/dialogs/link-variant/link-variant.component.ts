import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-link-variant',
  templateUrl: './link-variant.component.html',
  styleUrls: ['./link-variant.component.scss'],
})
export class LinkVariantComponent {
  accessTranslation = AppTranslate.Products;
  variantForm!: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { variant: any },
    private dialogRef: MatDialogRef<LinkVariantComponent>,
    private fb: FormBuilder
  ) {
    this.variantForm = fb.group({
      store_id: fb.control(null),
      variant_id: fb.control(data.variant.id),
      quantity: fb.control(0),
    });
  }
  link() {}
  cancel() {
    this.dialogRef.close();
  }
}
