import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { Account } from '../interfaces/account.interface';
import { Injectable } from '@angular/core';
import { Currency } from 'src/core/interfaces/currency.interface';
import { of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CurrencyService extends CRUDService<Account> {
  currencies: Currency[] = [];
  mainCurrency?: Currency;
  constructor(http: HttpClient) {
    super(http, 'ledger/currencies');
  }
  getCurrencies() {
    if (this.currencies.length == 0) {
      return this.readEntities('').pipe(
        tap((data) => {
          this.currencies = data;
          this.findMainCurrency();
        })
      );
    } else return of([]);
  }
  findMainCurrency() {
    this.mainCurrency = this.currencies.find(
      (currency) => currency.is_main == 1
    );
  }
}
