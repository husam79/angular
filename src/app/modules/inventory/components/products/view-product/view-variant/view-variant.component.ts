import { Component, SimpleChanges, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { InventoryActionCell } from './cell-renderers/action.cell';

@Component({
  selector: 'app-view-variant',
  templateUrl: './view-variant.component.html',
  styleUrls: ['./view-variant.component.scss'],
})
export class ViewVariantComponent extends AgTemplateComponent {
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  @Input('data') data: any[] = [];
  accessTranslation = AppTranslate.Products;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'variant',
        flex: 1.4,
      },
      {
        field: 'value',
        headerName: 'value',
      },
      {
        field: 'uom',
        headerName: 'unit',
      },
      {
        field: 'price',
        headerName: 'price',
      },

      {
        field: 'acc_no',
        minWidth: 200,
        flex: 1.4,
        headerName: 'account',
      },
      {
        field: 'net_weight',
        headerName: 'net-weight',
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'gross_weight',
        headerName: 'gross-weight',
      },
      {
        field: '',
        headerName: '',
        cellRenderer: InventoryActionCell,
        width: 80,
        minWidth: 80,
        flex: 0.3,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,
        resizable: false,
      },
      rowHeight: 50,
      context: { parent: this },
      rowData: this.rowData,
      paginationPageSize: 10,
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue) {
      this.gridOptions.api?.setRowData(changes['data']?.currentValue);
    }
  }
  onReady(e: any) {
    if (this.data.length > 0) {
      this.gridOptions.api?.setRowData(this.data);
    }
  }
}
