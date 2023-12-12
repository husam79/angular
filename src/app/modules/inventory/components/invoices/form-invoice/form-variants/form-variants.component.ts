import {
  Component,
  OnChanges,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppRoutes } from 'src/core/constant/routes';
import { InvoiceVariantInput } from './cell-renderers/variant-input.cell';
import { InventoryService } from 'src/app/modules/inventory/services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceVariantActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'invoice-form-variants',
  templateUrl: './form-variants.component.html',
  styleUrls: ['./form-variants.component.scss'],
})
export class FormVariantsComponent
  extends AgTemplateComponent
  implements OnChanges, OnInit
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public allVariants: any[] = [];
  public variants: any[] = [];
  public id: string = '';
  public vat: boolean = true;
  @Input('invoiceForm') invoiceForm?: UntypedFormGroup;
  @Input('data') data?: any[];
  @Input('vars') vars?: any[];
  accessTranslation = AppRoutes.Products;
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) {
    super();
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'variant',
        cellRenderer: InvoiceVariantInput,
        cellRendererParams: {
          type: 'search_variant',
          onlyNumbers: false,
        },
        flex: 1.8,
      },
      {
        field: 'unit',
        headerName: 'unit',
        cellRenderer: (params: any) => {
          return `<div>
          ${params.data?.value || ''} ${params.data?.uom || ''}
          </div>`;
        },
      },
      {
        field: 'unit_price',
        headerName: 'unit-price',
        cellRenderer: InvoiceVariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'quantity',
        headerName: 'quantity',
        cellRenderer: InvoiceVariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },

      {
        field: 'tax',
        headerName: 'vat',
      },
      {
        field: 'total',
        headerName: 'total',
      },
      {
        field: '',
        headerName: '',
        cellRenderer: InvoiceVariantActionsCell,
        width: 75,
        minWidth: 75,
        flex: 0.3,
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
      paginationPageSize: 20,
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

    if (!this.id) this.getVariants();
    this.invoiceForm
      ?.get('store_id')
      ?.valueChanges.pipe()
      .subscribe((id) => {
        if (this.allVariants.length > 0) this.filterVariant(id);
      });
    this.invoiceForm
      ?.get('currency_id')
      ?.valueChanges.pipe()
      .subscribe((id) => {
        if (id) {
          if (this.allVariants.length > 0) {
            let store = this.invoiceForm?.get('store_id')?.value;
            if (!store)
              this.variants = this.allVariants.filter(
                (v) => v.currency_id == id
              );
            else
              this.variants = this.allVariants.filter(
                (v) => v.currency_id == id && v.store_id == store
              );
          }
        }
      });
  }

  get VariantForm() {
    return this.invoiceForm?.get('entries') as UntypedFormGroup;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue?.length > 0) {
      this.rowData = changes['data']?.currentValue;
      this.buildVariantsForm(changes['data']?.currentValue);
    }
    if (changes && changes['vars']?.currentValue?.length > 0) {
      this.allVariants = changes['vars']?.currentValue;
      this.filterVariant();
    }
  }

  buildVariantsForm(variants: any[]) {
    let check = false;
    variants.forEach((variant) => {
      if (variant.tax > 0) check = true;
      let id = variant.id;
      if (!variant.id) id = self.crypto.randomUUID();
      variant['id'] = id;
      this.addVariant(variant, id);
    });
    this.vat = check;
    this.inventoryService.vat = this.vat;

    this.gridOptions.api?.setRowData(variants);
    if (!this.vat) {
      this.gridOptions.api?.setColumnDefs(
        this.columnDefs.filter((col) => col.field != 'tax')
      );
      this.gridOptions.api?.refreshHeader();
    }
  }
  buildVariantForm(variant?: any) {
    let group = this.fb.group({
      id: this.fb.control(''),
      index: this.fb.control(null),
      variant_id: this.fb.control(null, [Validators.required]),
      total: this.fb.control(null, []),
      tax: this.fb.control(null, []),
      quantity: this.fb.control(null, []),
      unit_price: this.fb.control(null),
      unit: this.fb.control(null),
      price: this.fb.control(null),
      new: this.fb.control(!variant),
    }) as any;
    if (variant) group.patchValue(variant);
    return group;
  }

  addVariant(variant?: any, id?: any) {
    if (!id) id = self.crypto.randomUUID();
    this.VariantForm.addControl(`${id}`, this.buildVariantForm(variant));
    if (!variant)
      this.gridOptions.api?.applyTransaction({
        add: [{ id: id, new: true, vat: 0 }],
      });
  }
  getVariants() {
    this.inventoryService.getAllVariants().subscribe((data) => {
      this.allVariants = data;
    });
  }
  filterVariant(store_id?: string) {
    let id = store_id;
    let currency = this.invoiceForm?.get('currency_id')?.value;
    if (!store_id) id = this.invoiceForm?.get('store_id')?.value || '';
    this.variants = this.allVariants.filter(
      (d) =>
        (id ? d.store_id == id : true) &&
        (currency
          ? d.currency_id == this.invoiceForm?.get('currency_id')?.value
          : true)
    );
  }
  flip() {
    if (this.vat) {
      this.gridOptions.api?.setColumnDefs(
        this.columnDefs.filter((col) => col.field != 'tax')
      );
      this.gridOptions.api?.refreshHeader();
    } else {
      this.gridOptions.api?.setColumnDefs(this.columnDefs);
      this.gridOptions.api?.refreshHeader();
    }

    this.vat = !this.vat;

    this.inventoryService.vat = this.vat;
    this.updateTotal();
  }
  gridReady(e: any) {
    if (!this.id) {
      this.addVariant();
    }
  }
  updateTotal() {
    let data: any[] = [];
    let value = this.VariantForm.value;

    Object.keys(value).map((v) => {
      let row = value[v];
      if (!this.vat) {
        row['total'] = (+row['unit_price'] * +row['quantity']).toFixed(2);
      } else {
        row['total'] = (
          +row['unit_price'] *
          +row['quantity'] *
          (1 + +row['tax'] / 100)
        ).toFixed(2);
      }

      data.push({ ...row, id: v });
    });
    this.gridOptions.api?.setRowData(data);
    this.gridOptions.api?.refreshCells({ force: true });
    // data.forEach((row) => {
    //   console.log(row['tax']);
    //   if (!this.vat)
    //     row['total'] = (+row['unit_price'] * +row['quantity']).toFixed(2);
    //   else {
    //     row['total'] = (
    //       +row['unit_price'] *
    //       +row['quantity'] *
    //       (1 + +row['tax'] / 100)
    //     ).toFixed(2);
    //   }
    // });
    // this.gridOptions.api?.setRowData(data);
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.inventoryService.vat = true;
  }
}
