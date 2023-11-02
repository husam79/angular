import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { CoreComponent } from 'src/core/components/core.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent extends CoreComponent {
  accessTranslation = AppTranslate.Transactions;
  currencyForm!: UntypedFormGroup;
  constructor(private fb: FormBuilder) {
    super();
    this.currencyForm = fb.group({
      credit_account: fb.control(null),
      credit_amount: fb.control(null),
      debit_account: fb.control(null),
      debit_amount: fb.control(null),
      service_cost: fb.control(null),
    });
    this.coreService.getAllAccounts().subscribe();
  }
  get credit() {
    return this.currencyForm.get('credit_account');
  }
  get debit() {
    return this.currencyForm.get('debit_account');
  }
}
