import {
  Component,
  HostBinding,
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
    <ng-container *ngIf="formGroup" [formGroup]="formGroup">
      <div class="d-flex-ng" *ngIf="key" [formGroupName]="key">
        <mat-form-field appearance="outline">
          <input
            matInput
            [formControlName]="field"
            #myElement
            autocomplete="off"
          />
        </mat-form-field>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        ::ng-deep {
          .mat-form-field-appearance-outline:not(.textarea)
            .mat-mdc-form-field-flex {
            height: 38px !important;
          }
        }
      }
    `,
  ],
})
export class TransactionDetailsInput implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild('myElement') firstItem: any;
  key: string = '';
  field: string = '';
  @HostBinding('custom-focus')
  onFocus(event: any) {
    console.log(event);
  }
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;

    this.formGroup = params.context.parent.transactionForm?.get('details');
    this.setConfig();
  }
  setConfig() {
    this.key = this.params.data.id;
    this.field = this.params.colDef?.field || '';
  }
  refresh(params: ICellRendererParams): boolean {
    this.firstItem.nativeElement?.focus();
    return true;
  }
}
