import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColDef, Column } from 'ag-grid-community';
import { ConsignmentService } from 'src/app/modules/logistics/services/consignment.service';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppRoutes } from 'src/core/constant/routes';
import { ItemInput } from './cell-renderers/item-input.cell';
import { ItemsService } from 'src/app/modules/logistics/services/items.service';
import { ConsItemsActionCell } from './cell-renderers/action.cell';

@Component({
  selector: 'consignment-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.scss'],
})
export class FormItemsComponent
  extends AgTemplateComponent
  implements OnChanges, OnInit
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public items = [];
  public id: string = '';
  @Input('formGroup') formGroup?: UntypedFormGroup;
  @Input('data') data?: any[];
  accessTranslation = AppRoutes.Consignments;
  constructor(
    private fb: FormBuilder,
    private consignmentService: ConsignmentService,
    public itemService: ItemsService,
    private route: ActivatedRoute
  ) {
    super();
    this.columnDefs = [
      {
        field: 'item',
        headerName: 'item-name',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'search_item',
        },
        minWidth: 200,
        width: 200,
        flex: 2,
      },
      {
        field: 'net_weight',
        headerName: 'net-weight',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'gross_weight',
        headerName: 'gross-weight',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'number_of_boxes',
        headerName: 'boxes-count',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'number_of_pieces',
        headerName: 'pieces-count',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'manufacturer',
        headerName: 'manufacturer',
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: false,
        },
      },
      {
        field: 'manufacturer_address',
        headerName: 'manufacturer-address',
        flex: 1.3,
        minWidth: 200,
        cellRenderer: ItemInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: false,
        },
      },
      {
        field: 'brand',
        headerName: 'brand',
        cellRenderer: ItemInput,
        resizable: false,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: false,
        },
      },
      {
        cellRenderer: ConsItemsActionCell,
        minWidth: 70,
        width: 70,
        flex: 0.3,
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
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  get ItemsForm() {
    return this.formGroup?.get('items') as UntypedFormGroup;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue?.length > 0) {
      this.rowData = changes['data']?.currentValue;
      this.buildItemsForm(changes['data']?.currentValue);
    }
  }

  buildItemsForm(items: any[]) {
    items.forEach((item) => {
      let id = item.id;
      if (!item.id) id = self.crypto.randomUUID();
      item['id'] = id;
      this.addItem(item, id);
    });

    this.gridOptions.api?.setRowData(items);
  }
  buildItemForm(variant?: any) {
    let group = this.fb.group({
      item_id: this.fb.control('', [Validators.required]),
      net_weight: this.fb.control(0),
      gross_weight: this.fb.control(0),
      number_of_boxes: this.fb.control(0),
      number_of_pieces: this.fb.control(0),
      manufacturer: this.fb.control(''),
      manufacturer_address: this.fb.control(''),
      brand: this.fb.control(''),
    }) as any;
    if (variant) group.patchValue(variant);
    return group;
  }

  addItem(variant?: any, id?: any) {
    if (!id) id = self.crypto.randomUUID();
    this.ItemsForm.addControl(`${id}`, this.buildItemForm(variant));
    if (!variant)
      this.gridOptions.api?.applyTransaction({ add: [{ id: id, new: true }] });
  }

  gridReady(e: any) {
    if (!this.id) {
      this.addItem();
    }
  }
}
