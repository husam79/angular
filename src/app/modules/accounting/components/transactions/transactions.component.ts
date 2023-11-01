import { Component } from '@angular/core';
import { TransactionGrid } from './list-grid/list-grid.grid';
import { Transaction } from '../../interfaces/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent extends TransactionGrid {
  constructor(private transactionService: TransactionService) {
    super();
    this.coreService.getAllAccounts().subscribe();
  }
  accountControl = new FormControl();
  data: Transaction[] = [];
  onGridReady(e: any) {
    this.transactionService.getTransactions().subscribe((data) => {
      this.setRowData(data);
    });
  }
}
