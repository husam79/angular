import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CoreComponent } from 'src/core/components/core.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TransactionService } from '../../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  providers: [DatePipe],
})
export class CurrencyExchangeComponent extends CoreComponent {
  accessTranslation = AppTranslate.Transactions;
  currencyForm!: UntypedFormGroup;
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.currencyForm = fb.group({
      credit_account: fb.control(null, [Validators.required]),
      credit_amount: fb.control(null, [Validators.required]),
      credit_currency: fb.control(null),
      debit_account: fb.control(null, [Validators.required]),
      debit_amount: fb.control(null, [Validators.required]),
      debit_currency: fb.control(null),
      service_cost: fb.control(null, [Validators.required]),
      date: fb.control(null, [Validators.required]),
    });
    //this.coreService.getAllAccounts().subscribe();
  }
  get credit() {
    return this.currencyForm.get('credit_account');
  }
  get debit() {
    return this.currencyForm.get('debit_account');
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  save() {
    if (this.currencyForm.invalid) {
      this.currencyForm.markAllAsTouched();
      return;
    }
    let form = this.currencyForm.value;
    let value = {
      ...this.currencyForm.value,
      credit_account: form.credit_account.no,
      credit_currency: form.credit_account.currency_id,
      debit_account: form.debit_account.no,
      debit_currency: form.debit_account.currency_id,
      date: this.datePipe.transform(this.currencyForm.value.date, 'yyyy-MM-dd'),
    };
    this.transactionService.createCurrency(value).subscribe((data) => {
      this.cancel();
    });
  }
}
