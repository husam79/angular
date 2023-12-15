import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/core/services/dialog.service';
import { FormInventoryComponent } from '../../form-inventory/form-inventory.component';
import { DeleteEntityComponent } from 'src/core/dialogs/delete-entity/delete-entity.component';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslate } from 'src/core/constant/translation';
import { StoreService } from 'src/app/modules/inventory/services/store.service';

@Component({
  selector: 'inventory-actions',
  template: `
    <div class="d-flex-ng" *ngIf="!pinned">
      <button mat-icon-button [matMenuTriggerFor]="menu" class="more-btn">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu" class="more-actions-menu">
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          (click)="editStore()"
        >
          <mat-icon color="accent">edit</mat-icon>
          <div>{{ 'edit' | translate }}</div>
        </button>
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          (click)="deleteStore()"
        >
          <mat-icon color="warn">delete</mat-icon>
          <div>{{ 'delete' | translate }}</div>
        </button>
      </mat-menu>
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
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private storeService: StoreService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.pinned = params.node.isRowPinned();
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  deleteStore() {
    this.dialogService
      .openDialog(DeleteEntityComponent, {
        size: 'ms',
        data: {
          title: this.translateService.instant(
            AppTranslate.Inventories + '.delete-inventory-title'
          ),
          message: this.translateService.instant(
            AppTranslate.Inventories + '.delete-inventory-message'
          ),
        },
      })
      .subscribe((data) => {
        if (data) {
          this.storeService
            .deleteStore({ id: this.params.data.id })
            .subscribe();
        }
      });
  }
  editStore() {
    this.dialogService
      .openDialog(FormInventoryComponent, { data: this.params.data, size: 'm' })
      .subscribe((res) => {
        if (res) {
          this.params.api.applyTransaction({ update: [res] });
          this.params.api.refreshCells({
            force: true,
            rowNodes: [this.params.node],
          });
        }
      });
  }
}
