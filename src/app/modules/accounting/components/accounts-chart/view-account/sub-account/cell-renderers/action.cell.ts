import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/core/services/dialog.service';
import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';

@Component({
  selector: 'account-transactions-list-actions',
  template: `
    <div class="d-flex-ng">
      <mat-icon
        color="primary"
        class="more-btn"
        (click)="viewTransaction()"
        *ngIf="params.data.transaction_id"
        >remove_red_eye</mat-icon
      >
    </div>
  `,
  styles: [
    `
      .more-btn {
        cursor: pointer;
      }
    `,
  ],
})
export class TransAccountActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private dialog: DialogService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  viewTransaction() {
    this.dialogService
      .openDialog(TransactionDialog, {
        data: {
          id: this.params.data.transaction_id,
        },
        size: 'l',
      })
      .subscribe((dd) => {});
  }
}
