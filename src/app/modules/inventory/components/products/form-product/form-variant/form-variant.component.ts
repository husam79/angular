import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { VariantInput } from './cell-renderer/variant-input.cell';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/modules/accounting/interfaces/account.interface';
import { AppRoutes } from 'src/core/constant/routes';
import { VariantActionsCell } from './cell-renderer/action.cell';

@Component({
  selector: 'app-form-variant',
  templateUrl: './form-variant.component.html',
  styleUrls: ['./form-variant.component.scss'],
})
export class FormVariantComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public accounts: Account[] = [];
  @Input('productForm') productForm?: UntypedFormGroup;
  @Input('data') data?: any[];
  accessTranslation = AppRoutes.Products;
  constructor(private fb: FormBuilder) {
    super();
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'variant',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: false,
        },
        flex: 1.4,
      },
      {
        field: 'value',
        headerName: 'value',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'uom',
        headerName: 'unit',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'select',
          dataArr: ['kg', 'g', 'pcs'],
        },
      },
      {
        field: 'price',
        headerName: 'price',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },

      {
        field: 'acc_name',
        cellRenderer: VariantInput,
        minWidth: 200,
        flex: 1.4,
        headerName: 'account',
        cellRendererParams: {
          type: 'search_account',
        },
      },
      {
        field: 'net_weight',
        headerName: 'net-weight',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'gross_weight',
        headerName: 'gross-weight',
        cellRenderer: VariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: '',
        headerName: '',
        cellRenderer: VariantActionsCell,
        headerComponentParams: { required: false },
        width: 75,
        minWidth: 75,
        flex: 0.3,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,
        headerComponentParams: { required: true },
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

    this.getChildAccount();
  }

  get VariantForm() {
    return this.productForm?.get('variants') as UntypedFormGroup;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue?.length > 0) {
      this.rowData = changes['data']?.currentValue;
      this.buildVariantsForm(changes['data']?.currentValue);
    }
  }

  buildVariantsForm(variants: any[]) {
    variants.forEach((variant) => {
      let id = variant.id;
      if (!variant.id) id = self.crypto.randomUUID();
      variant['id'] = id;
      this.addVariant(variant, id);
    });
    this.gridOptions.api?.setRowData(variants);
  }
  buildVariantForm(variant?: any) {
    let group = this.fb.group({
      id: this.fb.control(''),
      name: this.fb.control('', [Validators.required]),
      acc_name: this.fb.control('', []),
      account_id: this.fb.control('', [Validators.required]),
      currency_id: this.fb.control('', []),
      gross_weight: this.fb.control('', [Validators.required]),
      net_weight: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      uom: this.fb.control('', [Validators.required]),
      value: this.fb.control('', [Validators.required]),
      new: this.fb.control(!variant),
    }) as any;
    if (variant) group.patchValue(variant);
    return group;
  }

  addVariant(variant?: any, id?: any) {
    if (!id) id = self.crypto.randomUUID();
    this.VariantForm.addControl(`${id}`, this.buildVariantForm(variant));
    if (!variant)
      this.gridOptions.api?.applyTransaction({ add: [{ id: id, new: true }] });
  }
  getChildAccount() {
    this.coreService.getAllAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
  gridReady(e: any) {
    // this.addVariant();
    //  this.gridOptions.api?.setRowData(this.rowData);
  }
}
