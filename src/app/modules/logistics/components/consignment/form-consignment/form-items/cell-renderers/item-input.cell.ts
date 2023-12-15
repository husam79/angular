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
          *ngIf="params.type == 'input'"
          [onlyNumbers]="params.onlyNumbers || false"
        ></input-form-field>
        <search-form-field
          *ngIf="params.type === 'search_item'"
          class="form-field"
          [selectObject]="true"
          [control]="itemControl"
          [selectKey]="'id'"
          [searchKey]="'name_en'"
          class="form-field"
          [label]="'enter-item' | translate"
          [data]="parent.items"
          (dataChanged)="itemChanged($event)"
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
export class ItemInput implements ICellRendererAngularComp {
  params!: ICellRendererParams & {
    type: string;
    onlyNumbers?: boolean;
    dataArr: any[];
  };
  pinned: boolean = false;
  formGroup?: FormGroup;
  control?: any;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  itemControl: any;
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
    this.params = params;
    this.pinned = params.node.isRowPinned();

    this.formGroup = params.context.parent.formGroup?.get('items');
    this.parent = params.context.parent;
    this.setConfig();
    this.itemControl = this.formGroup?.controls[this.key]?.get('item_id');
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }
  itemChanged(e: any) {
    this.formGroup?.controls[this.key]
      ?.get('manufacturer')
      ?.setValue(e.manufacturer);
    this.formGroup?.controls[this.key]
      ?.get('manufacturer_address')
      ?.setValue(e.manufacturer_address);
  }
  refresh(
    params: ICellRendererParams & {
      type: string;
      onlyNumbers?: boolean;
      dataArr: any[];
    }
  ): boolean {
    this.firstItem?.nativeElement?.focus();
    this.params = params;
    return true;
  }
}
