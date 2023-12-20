import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Product } from '../../../interfaces/product.interface';
import { BalanceCell } from 'src/app/modules/accounting/shared/cell-renderers/balance.cell';
import { InvoiceStatus } from './cell-renderers/transfer-status.cell';
import { AppRoutes } from 'src/core/constant/routes';
import { InvoiceActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'invoices-table-grid',
  template: '',
  providers: [],
})
export class InvoiceGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  isPurchase: boolean = false;
  accessTranslation = AppTranslate.Invoices;
  constructor() {
    super();
    this.columnDefs = [
      {
        cellRenderer: InvoiceStatus,
        headerName: 'status',
        field: 'is_transfered',
        flex: 0.2,
        minWidth: 80,
        width: 80,
      },
      {
        field: 'supplier_name',
        headerName: 'invoice-partner',
        cellRenderer: (params: any) => {
          return `<div>${
            params.data.supplier_name ||
            params.data.account_name ||
            params.data.customer_name ||
            ' '
          }</div>`;
        },
      },
      { field: 'invoice_no', headerName: 'invoice-number' },
      {
        field: 'amount',
        headerName: 'invoice-value',
        cellRenderer: BalanceCell,
      },
      {
        field: 'amount',
        headerName: 'value-eur',
        cellRenderer: (params: any) => {
          let value = (params.value * params.data.conversion_factor).toFixed(2);

          return `<div>${value}</div>`;
        },
      },
      { field: 'date', headerName: 'date' },
      { field: 'notes', headerName: 'note', resizable: false },
      {
        field: 'action',
        minWidth: 75,
        width: 75,
        flex: 0.4,
        resizable: false,
        cellRenderer: InvoiceActionsCell,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      context: { parent: this },
      onRowClicked: (e) => {},
    };
    this.isPurchase = this.router.url.includes(AppRoutes.PurchaseInvoices);
  }

  setRowData(data: Product[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
