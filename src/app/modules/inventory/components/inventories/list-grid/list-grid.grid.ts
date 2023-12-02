import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Product } from '../../../interfaces/product.interface';
import { InventoriesActionsCell } from './cell-renderers/actions.cell';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'inventories-table-grid',
  template: '',
  providers: [],
})
export class InventoriesGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Inventories;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    super();
    this.columnDefs = [{ field: 'name', headerName: 'name', resizable: false }];
    this.gridOptions = {
      defaultColDef: { ...this.defaultOption, minWidth: 100 },
      onRowClicked: (event) => {
        this.router.navigate([`${event.data.id}`], { relativeTo: this.route });
      },
      ...this.gridOptions,
      rowSelection: 'single',
      onRowSelected: (params) => {
        // params.node.setData({ ...params, selected: true });
      },
      pagination: false,
      context: { parent: this },
    };
  }

  setRowData(data: Product[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
