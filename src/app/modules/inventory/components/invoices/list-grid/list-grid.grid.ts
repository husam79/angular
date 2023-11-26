import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'invoices-table-grid',
  template: '',
  providers: [],
})
export class ProductsGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Products;
  constructor() {
    super();
    this.columnDefs = [
      { field: 'supplier_name', headerName: 'invoice-partner' },
      { field: 'invoice_no', headerName: 'invoice-number' },
      { field: 'kind', headerName: 'kind' },
      { field: 'tax', headerName: 'vat' },
      {
        field: 'description',
        headerName: 'description',
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      context: { parent: this },
      onRowClicked: (e) => {},
    };
  }

  setRowData(data: Product[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
