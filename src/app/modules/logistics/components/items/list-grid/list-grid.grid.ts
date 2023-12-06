import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { ItemActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'items-table-grid',
  template: '',
  providers: [],
})
export class ItemsGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Items;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(protected itemService: ItemsService) {
    super();
    this.columnDefs = [
      { field: 'name', headerName: 'name' },
      { field: 'hs_code', headerName: 'hs-code' },
      { field: 'price', headerName: 'price' },
      { field: 'unit', headerName: 'unit' },
      {
        headerName: '',
        cellRenderer: ItemActionsCell,
        minWidth: 70,
        width: 70,
        flex: 0.4,
      },
    ];
    this.gridOptions = {
      defaultColDef: { ...this.defaultOption, minWidth: 100 },
      ...this.gridOptions,
      pagination: false,
      context: { parent: this },
    };
  }

  setRowData(data: any[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
