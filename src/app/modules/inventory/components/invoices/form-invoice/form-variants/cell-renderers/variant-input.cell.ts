import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'invoice-variant-input',
  template: `
    <ng-container *ngIf="formGroup" [formGroup]="formGroup">
      <div
        class="d-flex-ng"
        *ngIf="key"
        [formGroupName]="key"
        style="padding: 8px 0px;"
      >
        <input-form-field
          [group]="formGroup.controls[key]"
          [name]="field"
          class="form-field"
          (blur)="updateCalc()"
          [focus]="focus"
          *ngIf="params.type == 'input'"
          [onlyNumbers]="params.onlyNumbers || false"
        ></input-form-field>
        <app-search-variants
          [product]="true"
          *ngIf="params.type === 'search_variant'"
          class="form-field"
          [selectObject]="true"
          [focus]="focus"
          [control]="variantControl"
          [data]="parent.variants"
          (dataChanged)="fillControls($event)"
          style="width:100%"
        ></app-search-variants>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        width: 100%;
        ::ng-deep {
          .mat-form-field-appearance-outline:not(.textarea)
            .mat-mdc-form-field-flex {
            height: 36px !important;
          }

          .mat-mdc-text-field-wrapper.mdc-text-field--outlined
            .mat-mdc-form-field-infix {
            width: auto !important;
          }
        }
        .form-field {
          width: 98%;
        }
      }
    `,
  ],
})
export class InvoiceVariantInput implements ICellRendererAngularComp {
  params!: ICellRendererParams & {
    type: string;
    onlyNumbers?: boolean;
    dataArr: any[];
  };
  pinned: boolean = false;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  variantControl: any;
  focus?: boolean;
  key: string = '';
  field: string = '';
  parent: any;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}

  agInit(
    params: ICellRendererParams & {
      type: string;
      onlyNumbers?: boolean;
      dataArr: any[];
    }
  ): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();

    this.formGroup = params.context.parent.invoiceForm?.get('entries');
    this.parent = params.context.parent;
    this.setConfig();
    this.variantControl = this.formGroup?.controls[this.key]?.get('variant_id');
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }
  fillControls(e: any) {
    this.params.node.setData({
      ...this.params.data,
      uom: e.uom,
      value: e.value,
      tax: e.tax,
    });
    this.formGroup?.controls[this.key]?.get('uom')?.patchValue(e.uom);
    this.formGroup?.controls[this.key]?.get('unit_price')?.setValue(e.price);
    this.formGroup?.controls[this.key]?.get('tax')?.setValue(e.tax);
    this.updateCalc(e);
  }
  refresh(
    params: ICellRendererParams & {
      type: string;
      onlyNumbers?: boolean;
      dataArr: any[];
    }
  ): boolean {
    console.log('refreshed');
    this.focus = !this.focus;
    this.params = params;
    return true;
  }
  updateCalc(e?: any) {
    let unit_price =
      0 || +this.formGroup?.controls[this.key]?.get('unit_price')?.value;
    let quantity =
      0 || +this.formGroup?.controls[this.key]?.get('quantity')?.value;
    let tax = +(!e ? this.params.data.tax : e.tax);

    let total = unit_price * quantity;

    if (!isNaN(total)) {
      if (this.parent.vat) total = total * (1 + tax / 100);
      this.formGroup?.controls[this.key]
        ?.get('total')
        ?.setValue(total.toFixed(2));
      if (e)
        this.params.node.setData({
          ...this.params.data,
          uom: e.uom,
          value: e.value,
          tax: e.tax,
          total: total.toFixed(2),
        });
      else {
        this.params.node.setData({
          ...this.params.data,
          total: total.toFixed(2),
        });
      }
      this.parent.calcTotal(this.params.data.id, total);
    }
  }
}
