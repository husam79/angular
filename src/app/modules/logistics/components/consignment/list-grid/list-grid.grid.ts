import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute } from '@angular/router';
import { ConsignmentService } from '../../../services/consignment.service';
import { ConsignmentStatus } from './cell-renderers/status.cell';
import { ConsignActionsCell } from './cell-renderers/actions.cell';

@Component({
  selector: 'consignment-table-grid',
  template: '',
  providers: [],
})
export class ConsignmentGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Consignments;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(protected consignmentService: ConsignmentService) {
    super();
    this.columnDefs = [
      { field: 'acc_name', headerName: 'customer-name' },
      { field: 'calculation_method', headerName: 'calc-method' },
      { field: 'number_of_pallets', headerName: 'pallets-count' },
      {
        field: 'gr_is_fulfilled',
        headerName: 'gr-fulfilled',
        cellRenderer: ConsignmentStatus,
        flex: 0.8,
        width: 85,
        minWidth: 85,
      },
      {
        field: 'description',
        headerName: 'description',
        flex: 1.2,
      },
      {
        headerName: '',
        width: 70,
        minWidth: 70,
        flex: 0.3,
        cellRenderer: ConsignActionsCell,
        resizable: false,
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
