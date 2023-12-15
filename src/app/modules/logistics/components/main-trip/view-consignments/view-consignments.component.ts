import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TripConsActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'trip-view-consignments',
  templateUrl: './view-consignments.component.html',
  styleUrls: ['./view-consignments.component.scss'],
})
export class ViewConsignmentsComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  @Input('data') data: any[] = [];
  accessTranslation = AppTranslate.Consignments;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'acc_name',
        headerName: 'account',
        flex: 2,
      },
      {
        field: 'description',
        headerName: 'description',
        flex: 3,
      },
      {
        field: 'number_of_pallets',
        headerName: 'pallets-count',
      },
      {
        field: 'amount_due',
        headerName: 'amount-due',
      },

      {
        cellRenderer: TripConsActionsCell,
        resizable: false,
        flex: 0.3,
        width: 60,
        minWidth: 60,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,

      columnDefs: this.columnDefs,
      context: { parent: this },
      onRowClicked: (e) => {
        const row = this.gridOptions.api?.getSelectedRows()[0];
      },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue) {
      let data = changes['data']?.currentValue;
      this.gridOptions?.api?.setRowData(data);
      let total = 0;
      let pal = 0;
      data.forEach((d: any) => {
        total += +d.amount_due;
        pal += +d.number_of_pallets;
      });
      this.gridOptions?.api?.setPinnedBottomRowData([
        { amount_due: total, number_of_pallets: pal },
      ]);
    }
  }
}
