import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/core/services/dialog.service';
// import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';

@Component({
  selector: 'trip-cons-list-actions',
  template: `
    <div class="d-flex-ng" *ngIf="!pinned">
      <mat-icon color="primary" class="more-btn" (click)="viewConsignment()"
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
export class TripConsActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  pinned = false;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private dialog: DialogService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  viewConsignment() {
    this._router.navigate(
      [`/logistics/consignments/${this.params.data.id}/edit`],
      { queryParams: { trip: 'true' } }
    );
  }
}
