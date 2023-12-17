import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsignmentService } from 'src/app/modules/logistics/services/consignment.service';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'consignment-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss'],
})
export class ViewItemsComponent
  extends AgTemplateComponent
  implements OnChanges
{
  accessTranslation = AppTranslate.Consignments;
  columnDefs: any[];
  rowData?: any[];
  @Input('data') data?: any[];
  constructor(
    private consignmentService: ConsignmentService,
    private route: ActivatedRoute
  ) {
    super();
    this.columnDefs = [
      {
        field: 'item',
        headerName: 'item-name',

        minWidth: 200,
        width: 200,
        flex: 2,
      },
      {
        field: 'net_weight',
        headerName: 'net-weight',
      },
      {
        field: 'gross_weight',
        headerName: 'gross-weight',
      },
      {
        field: 'number_of_boxes',
        headerName: 'boxes-count',
      },
      {
        field: 'number_of_pieces',
        headerName: 'pieces-count',
      },
      {
        field: 'manufacturer',
        headerName: 'manufacturer',
      },
      {
        field: 'manufacturer_address',
        headerName: 'manufacturer-address',
        flex: 1.3,
        minWidth: 200,
      },
      {
        field: 'brand',
        headerName: 'brand',

        resizable: false,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,
        resizable: true,
      },
      rowHeight: 50,
      rowData: this.rowData,
      paginationPageSize: 15,
      context: { parent: this },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue?.length > 0) {
      this.rowData = changes['data']?.currentValue;
      this.gridOptions?.api?.setRowData(this.rowData || []);
    }
  }
}
