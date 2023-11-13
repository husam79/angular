import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { Account } from '../interfaces/account.interface';
import { Injectable } from '@angular/core';
import { Currency } from 'src/core/interfaces/currency.interface';
@Injectable({ providedIn: 'root' })
export class CurrencyService extends CRUDService<Account> {
  currencies: Currency[] = [];
  mainCurrency?: Currency;
  constructor(http: HttpClient) {
    super(http, 'ledger/currencies');
  }
  getCurrencies() {
    return this.readEntities('').pipe(
      tap((data) => {
        this.currencies = data;
        this.findMainCurrency();
      })
    );
  }
  findMainCurrency() {
    this.mainCurrency = this.currencies.find(
      (currency) => currency.is_main == 1
    );
  }
}
