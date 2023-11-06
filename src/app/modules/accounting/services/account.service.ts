import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { Account } from '../interfaces/account.interface';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AccountService extends CRUDService<Account> {
  accounts: Account[] = [];
  activeAccount = new BehaviorSubject<string>('');
  constructor(http: HttpClient) {
    super(http, 'ledger/accounts');
  }
  children() {
    return this.readEntities('children/table');
  }
  chart() {
    return this.readEntities('');
  }
  getAccount(no: string) {
    return this.readEntity('', no);
  }
  getLeafAccount(acc_no: string) {
    return this.readEntities('statement/st/we', {
      from_date: '2023-01-01',
      acc_no,
    }).pipe(
      map((res) => {
        res.entries.forEach((entry: any) => {
          entry['id'] = self.crypto.randomUUID();
        });
        return res;
      })
    );
  }
}
