import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute } from '@angular/router';
// import { ConsignmentService } from '../../../services/consignment.service';
import { MainTripService } from '../../../services/main-trip.service';
import { ConsignmentStatus } from '../../consignment/list-grid/cell-renderers/status.cell';
// import { ConsignmentStatus } from './cell-renderers/status.cell';
// import { ConsignActionsCell } from './cell-renderers/actions.cell';

@Component({
  selector: 'main-trip-table-grid',
  template: '',
  providers: [],
})
export class MainTripGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.MainTrip;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(protected mainTripService: MainTripService) {
    super();
    this.columnDefs = [
      { field: 'supplier_name', headerName: 'supplier' },
      { field: 'departure_date', headerName: 'departure-date' },
      { field: 'arrival_date', headerName: 'arrival-date' },
      {
        field: 'is_fulfilled',
        headerName: 'status',
        cellRenderer: ConsignmentStatus,
      },
      // {
      //   field: 'gr_is_fulfilled',
      //   headerName: 'gr-fulfilled',
      //   cellRenderer: ConsignmentStatus,
      //   resizable: false,
      //   flex: 0.5,
      //   width: 75,
      //   minWidth: 75,
      // },
      // {
      //   headerName: '',
      //   width: 70,
      //   minWidth: 70,
      //   flex: 0.3,
      //   cellRenderer: ConsignActionsCell,
      //   resizable: false,
      // },
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
