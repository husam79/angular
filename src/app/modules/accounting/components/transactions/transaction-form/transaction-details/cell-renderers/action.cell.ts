import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'transactions-details-actions',
  template: `
    <div class="d-flex-ng" *ngIf="!pinned">
      <button
        mat-icon-button
        class="more-btn"
        color="primary"
        (click)="deleteAccount()"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styles: [``],
})
export class DetailsActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  pinned: boolean = false;
  constructor(@Inject(INJECTOR) injector: Injector, private _router: Router) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  deleteAccount() {
    let id = this.params.data.id;
    (<FormGroup>(
      this.params.context.parent.transactionForm?.get('details')
    )).removeControl(id);
    this.params.api.applyTransaction({ remove: [this.params.data] });
  }
}
