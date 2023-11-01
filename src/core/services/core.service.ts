import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Currency } from '../interfaces/currency.interface';
import { Account } from 'src/app/modules/accounting/interfaces/account.interface';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CoreService extends CRUDService<any> {
  currencies: Currency[] = [];
  accounts: Account[] = [];
  constructor(http: HttpClient, private accountService: AccountService) {
    super(http, 'ledger');
  }
  getAllCurrencies() {
    return this.readEntities('currencies').pipe(
      tap((data: any) => {
        this.currencies = data;
      })
    );
  }
  getAllAccounts() {
    return this.accountService.children().pipe(
      tap((data: any) => {
        this.accounts = data;
      })
    );
  }
}
