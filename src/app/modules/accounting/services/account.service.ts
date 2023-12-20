import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, map, of, tap } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { Account } from '../interfaces/account.interface';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AccountService extends CRUDService<Account> {
  accounts: Account[] = [];
  accountsTree: Account[] = [];
  directParents: Account[] = [];
  refreshData = new Subject();
  activeAccount = new BehaviorSubject<string>('');
  constructor(http: HttpClient) {
    super(http, 'ledger/accounts');
  }
  children() {
    return this.readEntities('children/table');
  }
  getDirectParents() {
    if (this.directParents.length) return of(this.directParents);
    else
      return this.readEntities('direct-parents/table').pipe(
        tap((data) => {
          this.directParents = data;
        })
      );
  }
  getParents() {
    return this.readEntities('parents/table');
  }
  chart() {
    return this.readEntities('').pipe(
      tap((res) => {
        this.accountsTree = res;
      })
    );
  }
  getAvaliableNo(id: number) {
    return this.readEntity('available-child-no', id);
  }
  findNoInTree(no: string, data?: Account[]) {
    if (!data || data.length == 0) return;
    for (let i = 0; i < data.length; i++) {
      if (data[i].no == no) return data[i];
      let result: any = this.findNoInTree(no, data[i].children);
      if (result) return result;
    }
    return;
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
  createAccount(accountForm: any) {
    return this.createEntity('', accountForm);
  }
  editAccount(accountForm: any) {
    return this.updateEntity('', accountForm);
  }
}
