import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
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
        (click)="viewStore()"
      >
        <mat-icon>remove_red_eye</mat-icon>
      </button>
    </div>
  `,
  styles: [``],
})
export class InventoriesActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  pinned: boolean = false;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  viewStore() {
    this._router.navigate([`${this.params.data.id}`], {
      relativeTo: this.route,
    });
  }
}
