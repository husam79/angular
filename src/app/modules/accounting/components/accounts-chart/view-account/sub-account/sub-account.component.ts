import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TransAccountActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.component.html',
  styleUrls: ['./sub-account.component.scss'],
})
export class SubAccountComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  @Input('accountNumber') accountNumber: any[] = [];
  accessTranslation = AppTranslate.Transactions;
  constructor(private accountService: AccountService) {
    super();
    this.columnDefs = [
      {
        field: 'description',
        headerName: 'description',
        flex: 5,
      },
      {
        field: 'credit',
        headerName: 'credit',
      },
      {
        field: 'debit',
        headerName: 'debit',
      },
      {
        field: 'balance',
        headerName: 'balance',
      },
      {
        field: 'date',
        headerName: 'date',
      },
      {
        cellRenderer: TransAccountActionsCell,
        resizable: false,
        width: 60,
        minWidth: 60,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      paginationPageSize: 60,
      columnDefs: this.columnDefs,
      onRowClicked: (e) => {
        const row = this.gridOptions.api?.getSelectedRows()[0];
      },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['accountNumber']?.currentValue) {
      this.accountService
        .getLeafAccount(changes['accountNumber']?.currentValue)
        .subscribe((data) => {
          this.setRowData(data.entries);
        });
    }
  }
  setRowData(data: any[]) {
    if (data) this.gridOptions.api?.setRowData(data);
  }
  ready(e: any) {
    //this.setRowData(this.children);
  }
}
