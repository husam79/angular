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
import { AppRoutes } from 'src/core/constant/routes';
import { RecipeVariantInput } from './cell-renderer/variant-input.cell';
import { RecipeVariantActionsCell } from './cell-renderer/action.cell';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/modules/inventory/services/inventory.service';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'form-recipe-variant',
  templateUrl: './form-variant.component.html',
  styleUrls: ['./form-variant.component.scss'],
})
export class FormRecipeVariantComponent
  extends AgTemplateComponent
  implements OnChanges, OnInit
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public variants: any[] = [];

  public id: string = '';

  @Input('recipeForm') productForm?: UntypedFormGroup;
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
        field: 'name',
        headerName: 'variant',
        cellRenderer: RecipeVariantInput,
        cellRendererParams: {
          type: 'search_variant',
          onlyNumbers: false,
        },
        flex: 1.4,
      },
      {
        field: 'quantity',
        headerName: 'quantity',
        cellRenderer: RecipeVariantInput,
        cellRendererParams: {
          type: 'input',
          onlyNumbers: true,
        },
      },
      {
        field: 'uom',
        headerName: 'unit',
      },

      {
        field: '',
        headerName: '',
        cellRenderer: RecipeVariantActionsCell,
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
      this.buildVariantsForm(changes['data']?.currentValue);
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

  get VariantForm() {
    return this.productForm?.get('variants') as UntypedFormGroup;
  }

  buildVariantsForm(variants: any[]) {
    variants.forEach((variant) => {
      let id = variant.id;
      if (!variant.id) id = self.crypto.randomUUID();
      variant['id'] = id;
      this.addVariant(variant, id, variant['in_out'] == 'out');
    });
    let vars = variants.filter((v) => v.in_out == 'in');
    this.gridOptions.api?.setRowData(vars);
  }
  buildVariantForm(variant?: any, inout?: string) {
    let group = this.fb.group({
      id: this.fb.control(null),
      variant_id: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(null, [Validators.required]),
      in_out: this.fb.control(inout, []),
      new: this.fb.control(!variant),
    }) as any;
    if (variant) group.patchValue(variant);
    return group;
  }

  addVariant(variant?: any, id?: any, pinned: boolean = false) {
    if (pinned) {
      if (!id) id = self.crypto.randomUUID();
      this.VariantForm.addControl(
        `${id}`,
        this.buildVariantForm(variant, 'out')
      );
      this.gridOptions.api?.setPinnedBottomRowData([{ id, new: !!variant }]);
    } else {
      if (!id) id = self.crypto.randomUUID();
      this.VariantForm.addControl(
        `${id}`,
        this.buildVariantForm(variant, 'in')
      );
      if (!variant)
        this.gridOptions.api?.applyTransaction({
          add: [{ id: id, new: true }],
        });
    }
  }

  gridReady(e: any) {
    if (!this.id) {
      this.addVariant('', '');
      this.addVariant('', '', true);
    }
  }
}
