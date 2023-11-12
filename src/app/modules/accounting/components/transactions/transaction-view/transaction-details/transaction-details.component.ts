import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
import { Account } from 'src/app/modules/accounting/interfaces/account.interface';

@Component({
  selector: 'app-transaction-view-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionViewDetailsComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  accessTranslation = AppTranslate.Transactions;
  fb = inject(FormBuilder);
  @Input('transactionForm') transactionForm!: FormGroup;
  @Input('currency') currency?: any;
  @Input('entries') entries?: any;
  @Input('id') id?: any;

  constructor(private accountService: AccountService) {
    super();
    this.columnDefs = [
      {
        field: 'acc_name',
        headerName: 'account',

        flex: 1.4,
      },
      {
        field: 'd',
        headerName: 'debit',
      },
      {
        field: 'c',
        headerName: 'credit',
      },
      {
        field: 'description',

        headerName: 'description',
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,

        resizable: false,
      },
      context: { parent: this },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['entries']?.currentValue &&
      changes['entries']?.currentValue?.length > 0
    ) {
      let entries = changes['entries']?.currentValue;
      entries.forEach((entry: any) => {
        entry['id'] = self.crypto.randomUUID();
      });
      this.gridOptions.api?.setRowData(entries);
    }
  }

  onGridReady(e: any) {
    this.gridOptions.api?.setRowData([]);
    this.setPinnedRow();
  }
  setPinnedRow() {
    this.gridOptions.api?.setPinnedBottomRowData([{ acc_no: 'Total', id: 0 }]);
  }

  calcTotals(values: any) {
    let debit = 0;
    let credit = 0;
    for (let key in values) {
      debit += +values[key].d || 0;
      credit += +values[key].c || 0;
    }
    this.gridOptions.api?.setPinnedBottomRowData([
      { acc_no: 'Total', d: debit, c: credit },
    ]);
  }
}
