import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { Account } from '../interfaces/account.interface';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AccountService extends CRUDService<Account> {
  constructor(http: HttpClient) {
    super(http, 'ledger/accounts');
  }
  children() {
    return this.readEntities('children/table');
  }
}
