import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  OnInit,
} from '@angular/core';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/modules/inventory/services/inventory.service';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'view-recipe-variant',
  templateUrl: './view-variant.component.html',
  styleUrls: ['./view-variant.component.scss'],
})
export class ViewRecipeVariantComponent
  extends AgTemplateComponent
  implements OnChanges, OnInit
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public variants: any[] = [];

  public id: string = '';

  @Input('data') data?: any[];
  accessTranslation = AppTranslate.Recipes;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {
    super();
    this.columnDefs = [
      {
        field: 'variant_name',
        headerName: 'variant',
        flex: 1.4,
      },
      {
        field: 'quantity',
        headerName: 'quantity',
      },
      {
        field: 'uom',
        headerName: 'unit',
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,
        resizable: false,
      },
      rowHeight: 50,
      rowData: this.rowData,
      paginationPageSize: 10,
      context: { parent: this },

      onCellFocused: (params) => {
        let nodes: any[] = [];
        if (!params.rowPinned) {
          params.api.forEachNode((node) => {
            if (node.rowIndex == params.rowIndex) {
              nodes = [node];
            }
          });
          params.api.refreshCells({
            columns: [
              params.column instanceof Column ? params.column?.getColId() : '',
            ],
            rowNodes: nodes,
            force: true,
          });
        }
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue?.length > 0) {
      this.rowData = changes['data']?.currentValue;
      let out = this.rowData.find((v) => v.in_out == 'out');
      let data = this.rowData.filter((v) => v.in_out == 'in');
      this.gridOptions.api?.setPinnedBottomRowData([out]);
      this.gridOptions.api?.setRowData(data);
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getVariants();
  }

  getVariants() {
    this.inventoryService.getAllVariants().subscribe((data) => {
      this.variants = data;
    });
  }

  gridReady(e: any) {}
}
