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
  selector: 'transactions-details-input',
  template: `
    <ng-container
      *ngIf="
        formGroup &&
        !pinned &&
        (!params.context.parent?.id ||
          (params.context.parent?.id && field === 'description'))
      "
      [formGroup]="formGroup"
    >
      <div
        class="d-flex-ng"
        *ngIf="key"
        [formGroupName]="key"
        style="padding: 8px 0px;"
      >
        <mat-form-field
          appearance="outline"
          class="form-field"
          *ngIf="field !== 'acc_name'"
        >
          <input
            matInput
            [formControlName]="field"
            #myElement
            autocomplete="off"
            (blur)="disable()"
            (keydown.space)="$event.stopPropagation()"
            [mask]="field !== 'description' ? 'separator' : ''"
            [allowNegativeNumbers]="field !== 'description' && true"
          />
        </mat-form-field>
        <app-search-accounts
          *ngIf="field === 'acc_name'"
          [control]="accountControl"
          [currency]="parent?.currency"
          [data]="parent.accounts"
          [focus]="focus"
          style="width:100%"
        ></app-search-accounts>
      </div>
    </ng-container>
    <ng-container
      *ngIf="pinned || (params.context.parent?.id && field !== 'description')"
    >
      {{ params.value }}
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
export class TransactionDetailsInput implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  pinned: boolean = false;
  formGroup?: FormGroup;
  focus?: boolean;
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

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();

    this.formGroup = params.context.parent.transactionForm?.get('details');
    this.parent = params.context.parent;
    this.setConfig();
    this.accountControl = this.formGroup?.controls[this.key]?.get('acc_no');
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }

  refresh(params: ICellRendererParams): boolean {
    this.firstItem?.nativeElement?.focus();
    this.focus = !this.focus;
    return true;
  }

  disable() {
    let row = this.formGroup?.controls[this.key] as FormGroup;
    let firstControl = row?.controls['c'];
    let secondControl = row?.controls['d'];
    if (firstControl.disabled || secondControl.disabled) return;
    if (
      typeof firstControl?.value == 'number' &&
      typeof secondControl?.value !== 'number'
    ) {
      secondControl.setValue(0);
      return secondControl?.disable({ emitEvent: false, onlySelf: true });
    }
    if (
      typeof firstControl?.value !== 'number' &&
      typeof secondControl?.value === 'number'
    ) {
      firstControl.setValue(0);
      return firstControl?.disable({ emitEvent: false, onlySelf: true });
    }
    if (
      typeof firstControl?.value !== 'number' &&
      typeof secondControl?.value !== 'number'
    )
      return;
    secondControl?.enable({ emitEvent: false, onlySelf: true });
    secondControl?.enable({ emitEvent: false, onlySelf: true });
  }
}
