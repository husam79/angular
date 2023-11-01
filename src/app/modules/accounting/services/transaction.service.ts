import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/core/services/crud.service';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class TransactionService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'ledger/transactions');
  }
  createTransaction(formData: any) {
    return this.createEntity('', formData);
  }
  getTransactions() {
    return this.readEntities('', { from_date: '2023-01-01' });
  }
  getTransaction(id: any) {
    return this.readEntity('', id);
  }
}
