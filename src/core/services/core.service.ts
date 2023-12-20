import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Currency } from '../interfaces/currency.interface';
import { Account } from 'src/app/modules/accounting/interfaces/account.interface';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
import { tap, of } from 'rxjs';
import { CurrencyService } from 'src/app/modules/accounting/services/currency.service';
@Injectable({ providedIn: 'root' })
export class CoreService extends CRUDService<any> {
  currencies: Currency[] = [];
  accounts: Account[] = [];
  constructor(
    http: HttpClient,
    private accountService: AccountService,
    private currencyService: CurrencyService
  ) {
    super(http, 'ledger');
  }
  getAllCurrencies() {
    if (this.currencies.length == 0)
      return this.currencyService.getCurrencies().pipe(
        tap((data: any) => {
          this.currencies = data;
        })
      );
    return of(this.currencies);
  }
  getAllAccounts(refresh: boolean = false) {
    if (refresh)
      return this.accountService.children().pipe(
        tap((data: any) => {
          this.accounts = data;
        })
      );

    if (this.accounts.length == 0)
      return this.accountService.children().pipe(
        tap((data: any) => {
          this.accounts = data;
        })
      );
    return of([]);
  }
}
