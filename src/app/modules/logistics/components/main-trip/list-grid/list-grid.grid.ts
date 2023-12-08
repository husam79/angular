import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute } from '@angular/router';
import { MainTripService } from '../../../services/main-trip.service';
import { ConsignmentStatus } from '../../consignment/list-grid/cell-renderers/status.cell';
import { TripActionsCell } from './cell-renderers/action.cell';
import { DatePipe } from '@angular/common';

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
      { field: 'acc_name', headerName: 'supplier' },
      {
        field: 'departure_date',
        headerName: 'departure-date',
        cellRenderer: (params: any) => {
          let date = params.value?.split('T')[0];
          return `<div>${date}</div>`;
        },
      },
      {
        field: 'arrival_date',
        headerName: 'arrival-date',
        cellRenderer: (params: any) => {
          let date = params.value?.split('T')[0];
          return `<div>${date}</div>`;
        },
      },
      {
        field: 'is_fulfilled',
        headerName: 'status',
        cellRenderer: ConsignmentStatus,
      },
      {
        headerName: '',
        cellRenderer: TripActionsCell,
        width: 75,
        minWidth: 75,
        flex: 0.3,
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
