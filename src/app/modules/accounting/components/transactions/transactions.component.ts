import { Component } from '@angular/core';
import { TransactionGrid } from './list-grid/list-grid.grid';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent extends TransactionGrid {
  data: Transaction[] = [];
  onGridReady(e: any) {
    this.data = [
      {
        id: 321,
        date: '2023-10-10',
        value: 321,
        currency: 'EUR',
        value_eur: 23131,
        user: 'any',
        description: 'this is description',
      },
      {
        id: 322,
        date: '2023-10-10',
        value: 321,
        currency: 'EUR',
        value_eur: 23131,
        user: 'any',
        description: 'this is description',
      },
    ];
    this.setRowData(this.data);
  }
}
