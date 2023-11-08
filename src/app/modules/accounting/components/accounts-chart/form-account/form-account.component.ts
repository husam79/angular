import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss'],
})
export class FormAccountComponent implements OnInit {
  accessTranslation = AppTranslate.Chart;
  accountForm!: UntypedFormGroup;
  accountNumber = '';
  accountName = '';
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = fb.group({
      name: fb.control(null, [Validators.required]),
      no: fb.control({ disabled: true, value: null }),
      is_main: fb.control(0),
      parent: fb.control(null),
      currency_id: fb.control(null),
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
    this.route.parent?.params?.subscribe((param) => {
      if (param['id']) {
        this.editMode = true;
        this.accountService.getAccount(param['id']).subscribe((data) => {
          this.accountForm.patchValue(data);
          this.accountName = data.name;
          this.accountNumber = data.no;
          if (data.is_main) {
            this.accountForm.get('currency_id')?.disable();
            this.accountForm.get('is_main')?.disable();
            this.accountForm.get('parent')?.disable();
          }
        });
      }
    });
    this.route.queryParams.subscribe((query) => {
      if (query['parent_number']) {
        this.accountService
          .getAccount(query['parent_number'])
          .subscribe((data) => {
            this.calcNumber('', data);
            this.parent?.patchValue(data.no);
          });
      }
    });
  }

  calcNumber(no: string, parent?: any) {
    let node = parent;
    if (!parent)
      node = this.accountService.findNoInTree(
        no,
        this.accountService.accountsTree
      );
    if (node) {
      let len = node.children.length + 1;
      let number = len < 10 ? `${node.no}0${len}` : `${node.no}${len}`;
      this.accountForm.get('no')?.patchValue(number);
      this.accountNumber = number;
    }
  }
  checkCurrency(event: any) {
    if (event.value == 1) {
      this.currency_id?.reset();
      this.currency_id?.disable();
    } else this.currency_id?.enable();
  }
  fillAccountName() {
    this.accountName = this.accountForm.get('name')?.value;
  }
  save() {
    if (this.accountForm.invalid) this.accountForm.markAllAsTouched();
    else {
      if (!this.editMode)
        this.accountService
          .createAccount(this.accountForm.getRawValue())
          .subscribe((data) => {
            this.accountService.refreshData.next(true);
            this.cancel();
          });
      else {
        this.accountService
          .editAccount(this.accountForm.getRawValue())
          .subscribe((data) => {
            this.accountService.refreshData.next(true);
            this.cancel();
          });
      }
    }
  }
  cancel() {
    if (!this.editMode) this.router.navigate(['/accounting/chart']);
    else this.router.navigate(['../'], { relativeTo: this.route });
  }
}
