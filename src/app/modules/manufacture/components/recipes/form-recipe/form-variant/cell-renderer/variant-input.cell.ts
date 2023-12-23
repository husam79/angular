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
  selector: 'recipe-variant-input',
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
          [flexView]="'d-flex-normal'"
          [focus]="focus"
          *ngIf="params.type == 'input'"
          [onlyNumbers]="params.onlyNumbers || false"
        ></input-form-field>
        <search-form-field
          *ngIf="params.type === 'search_variant'"
          class="form-field"
          [selectObject]="true"
          [focus]="focus"
          [control]="variantControl"
          [searchKey]="'variant_name'"
          [selectKey]="'variant_id'"
          [data]="parent.variants"
          (dataChanged)="fillControls($event)"
        ></search-form-field>
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
export class RecipeVariantInput implements ICellRendererAngularComp {
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

    this.formGroup = params.context.parent.productForm?.get('variants');
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
    });
    this.formGroup?.controls[this.key]?.get('uom')?.patchValue(e.uom);
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
}
