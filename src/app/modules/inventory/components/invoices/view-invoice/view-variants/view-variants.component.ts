import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { InventoryService } from 'src/app/modules/inventory/services/inventory.service';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'view-invoice-variants',
  templateUrl: './view-variants.component.html',
  styleUrls: ['./view-variants.component.scss'],
})
export class ViewVariantsComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Products;
  @Input('data') data?: any[];
  rowData: any[] = [];
  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) {
    super();
    this.columnDefs = [
      {
        field: 'variant_name',
        headerName: 'variant',

        flex: 1.8,
      },
      {
        field: 'unit',
        headerName: 'unit',
        cellRenderer: (params: any) => {
          console.log(params);
          return `<div>
          ${params.data?.value || ''} ${params.data?.uom || ''}
          </div>`;
        },
      },
      {
        field: 'unit_price',
        headerName: 'unit-price',
      },
      {
        field: 'quantity',
        headerName: 'quantity',
      },

      {
        field: 'tax',
        headerName: 'vat',
      },
      {
        field: 'total',
        headerName: 'total',
        resizable: false,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      context: { parent: this },
      pagination: false,
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue) {
      this.rowData = changes['data']?.currentValue.entries;
      console.log(this.gridOptions.api);
      this.gridOptions.api?.setRowData(this.rowData);
      this.gridOptions.api?.setPinnedBottomRowData([
        {
          total: changes['data']?.currentValue.total,
        },
      ]);
    }
  }
}
