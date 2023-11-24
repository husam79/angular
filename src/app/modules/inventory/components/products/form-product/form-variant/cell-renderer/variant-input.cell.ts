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
  selector: 'variant-input',
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
          *ngIf="params.type == 'input'"
          [onlyNumbers]="params.onlyNumbers || false"
        ></input-form-field>
        <select-form-field
          [group]="formGroup.controls[key]"
          [name]="field"
          class="form-field"
          *ngIf="params.type == 'select'"
          [data]="params.dataArr"
        >
          <ng-template let-item>{{ item }}</ng-template>
        </select-form-field>
        <app-search-accounts
          *ngIf="params.type === 'search_account'"
          class="form-field"
          [selectObject]="true"
          [external]="true"
          [control]="accountControl"
          [data]="parent.accounts"
          (dataChanged)="fillControls($event)"
          style="width:100%"
        ></app-search-accounts>
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
export class VariantInput implements ICellRendererAngularComp {
  params!: ICellRendererParams & {
    type: string;
    onlyNumbers?: boolean;
    dataArr: any[];
  };
  pinned: boolean = false;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  accountControl: any;
  @ViewChild('myElement') firstItem: any;
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
    console.log(params.type);
    this.params = params;
    this.pinned = params.node.isRowPinned();

    this.formGroup = params.context.parent.productForm?.get('variants');
    this.parent = params.context.parent;
    this.setConfig();
    this.accountControl = this.formGroup?.controls[this.key]?.get('acc_no');
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }
  fillControls(e: any) {
    console.log(e);
    this.formGroup?.controls[this.key]?.get('acc_name')?.patchValue(e.name);
    this.formGroup?.controls[this.key]
      ?.get('currency_id')
      ?.patchValue(e.currency_id);
  }
  refresh(params: ICellRendererParams): boolean {
    this.firstItem?.nativeElement?.focus();
    return true;
  }
}
