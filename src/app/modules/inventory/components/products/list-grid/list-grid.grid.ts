import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Product } from '../../../interfaces/product.interface';
import { ProductActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'transaction-table-grid',
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
      { field: 'name', headerName: this.accessTranslation + '.name' },
      { field: 'brand', headerName: this.accessTranslation + '.brand' },
      { field: 'kind', headerName: this.accessTranslation + '.kind' },
      { field: 'tax', headerName: this.accessTranslation + '.vat' },
      {
        field: 'description',
        headerName: this.accessTranslation + '.description',
      },
      {
        cellRenderer: ProductActionsCell,
        width: 80,
        minWidth: 80,
        flex: 0.2,
        resizable: false,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      onRowClicked: (e) => {},
    };
  }

  setRowData(data: Product[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
