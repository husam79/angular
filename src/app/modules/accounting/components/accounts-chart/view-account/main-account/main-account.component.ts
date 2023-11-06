import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { SubAccountCell } from './cell-renderers/sub-account.cell';
import { BalanceCell } from 'src/app/modules/accounting/shared/cell-renderers/balance.cell';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.scss'],
})
export class MainAccountComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  @Input('children') children: any[] = [];
  accessTranslation = AppTranslate.Chart;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'name',
        headerName: this.accessTranslation + '.sub-account',
        cellRenderer: SubAccountCell,
      },
      {
        field: 'currency_id',
        headerName: 'balance',
        cellRenderer: BalanceCell,
        resizable: false,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      pagination: false,

      columnDefs: this.columnDefs,
      onRowClicked: (e) => {
        const row = this.gridOptions.api?.getSelectedRows()[0];
      },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['children']?.currentValue) {
      console.log(changes['children']?.currentValue);
      this.setRowData(changes['children']?.currentValue);
    }
  }
  setRowData(data: any[]) {
    if (data) this.gridOptions.api?.setRowData(data);
  }
  ready(e: any) {
    this.setRowData(this.children);
  }
}
