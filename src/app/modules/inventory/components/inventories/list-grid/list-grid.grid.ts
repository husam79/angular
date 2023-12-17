import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Product } from '../../../interfaces/product.interface';
import { InventoriesActionsCell } from './cell-renderers/actions.cell';
import { ActivatedRoute } from '@angular/router';

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
    this.columnDefs = [
      { field: 'name', headerName: 'name' },
      { field: 'store_type', headerName: 'type' },
      {
        cellRenderer: InventoriesActionsCell,
        headerName: '',
        width: 60,
        minWidth: 60,
        flex: 0.4,
        resizable: false,
      },
    ];
    this.gridOptions = {
      defaultColDef: { ...this.defaultOption, minWidth: 100 },
      onRowClicked: (event) => {
        //
      },
      ...this.gridOptions,

      onCellClicked: (event) => {
        let header = event.column.getColId();
        if (header != '0') {
          event.node.setSelected(true);
          this.router.navigate([`${event.data.id}`], {
            relativeTo: this.route,
          });
        }
      },
      pagination: false,
      context: { parent: this },
    };
  }

  setRowData(data: Product[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
