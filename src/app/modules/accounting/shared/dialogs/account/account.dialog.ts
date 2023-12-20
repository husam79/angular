import { Component, Inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { Account } from '../../../interfaces/account.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.dialog.html',
  styleUrls: ['./account.dialog.scss'],
})
export class AccountDialogComponent {
  accessTranslation = AppTranslate.Chart;
  accountForm!: UntypedFormGroup;
  data: Account[] = [];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public d: any
  ) {
    console.log(d);
    this.accountForm = fb.group({
      name: fb.control(null, [Validators.required]),
      no: fb.control(''),
      is_main: fb.control(0),
      parent: fb.control(null, [Validators.required]),
      currency_id: fb.control(d?.id),
      description: fb.control(null),
    });
  }
  get currency_id() {
    return this.accountForm.get('currency_id');
  }
  get parent() {
    return this.accountForm.get('parent');
  }
  ngOnInit(): void {
    this.accountService.getDirectParents().subscribe((data) => {
      this.data = data;
    });
  }
  calcNumber(e: any) {
    this.accountService.getAvaliableNo(e.acc_no).subscribe((data) => {
      this.accountForm.get('no')?.setValue(data);
    });
  }
  save() {
    if (this.accountForm.invalid) return;
    this.accountService
      .createAccount(this.accountForm.value)
      .subscribe((data) => {
        this.dialogRef.close({ ...this.accountForm.value, no: data.msg });
      });
  }
  cancel() {
    this.dialogRef.close();
  }
}
