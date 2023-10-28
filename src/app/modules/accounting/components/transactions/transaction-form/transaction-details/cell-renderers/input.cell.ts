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
    <ng-container *ngIf="formGroup && !pinned" [formGroup]="formGroup">
      <div
        class="d-flex-ng"
        *ngIf="key"
        [formGroupName]="key"
        style="padding: 8px 0px;"
      >
        <mat-form-field
          appearance="outline"
          class="form-field"
          *ngIf="field !== 'account'"
        >
          <input
            matInput
            [formControlName]="field"
            #myElement
            autocomplete="off"
            mask="separator"
            [allowNegativeNumbers]="true"
          />
        </mat-form-field>
        <app-search-accounts
          *ngIf="field === 'account'"
          [control]="accountControl"
        ></app-search-accounts>
      </div>
    </ng-container>
    <ng-container *ngIf="pinned">
      {{ params.value }}
    </ng-container>
  `,
  styles: [
    `
      :host {
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
          width: 90%;
        }
      }
    `,
  ],
})
export class TransactionDetailsInput implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  pinned: boolean = false;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  accountControl: any;
  @ViewChild('myElement') firstItem: any;
  key: string = '';
  field: string = '';
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();
    this.formGroup = params.context.parent.transactionForm?.get('details');
    this.setConfig();
    this.accountControl = this.formGroup?.controls[this.key]?.get('account');
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }

  refresh(params: ICellRendererParams): boolean {
    this.firstItem?.nativeElement?.focus();
    return true;
  }
}
