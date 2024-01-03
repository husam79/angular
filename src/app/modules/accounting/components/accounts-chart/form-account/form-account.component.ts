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
  id:number=0;
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = fb.group({
      name: fb.control('', [Validators.required]),
      no: fb.control('', [Validators.required]),
      is_main: fb.control(0),
      parent: fb.control('', [Validators.required]),
      currency_id: fb.control(''),
      description: fb.control(''),
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
          this.id=+data.id
          this.accountForm.get('is_main')?.disable();
          if (data.is_main) {
            this.accountForm.get('currency_id')?.disable();

           // this.accountForm.get('parent')?.disable();
          }
        });
      }
    });
    this.route.queryParams.subscribe((query) => {
      if (query['parent_number']) {
        this.parent?.patchValue(+query['parent_number']);
      }
    });
  }

  calcNumber(no: string, parent?: any) {
    if (this.editMode){return;}
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
          .editAccount({...this.accountForm.getRawValue(),id:this.id})
          .subscribe((data) => {
            this.accountService.refreshData.next(true);
            this.cancel();
          });
      }
    }
  }
  cancel() {
    if (!this.editMode)
      this.router.navigate(['/accounting/chart'], {
        queryParamsHandling: 'merge',
      });
    else{
      this.router.navigate([`../../${this.accountForm.value.no}`], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
      });}
  }
}
