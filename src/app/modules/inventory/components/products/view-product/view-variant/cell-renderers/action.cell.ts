import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { VariantService } from 'src/app/modules/inventory/services/variant.service';
import { LinkVariantComponent } from 'src/app/modules/inventory/dialogs/link-variant/link-variant.component';

@Component({
  selector: 'variant-inventory-action',
  template: `
    <div class="d-flex-ng" *ngIf="!pinned">
      <button
        mat-icon-button
        class="more-btn"
        color="primary"
        (click)="linkWithInventory()"
      >
        <mat-icon>link</mat-icon>
      </button>
    </div>
  `,
  styles: [``],
})
export class InventoryActionCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  pinned: boolean = false;
  id: string = '';
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private translateService: TranslateService,
    private variantService: VariantService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.id = this.route.snapshot.params['id'];
    this.pinned = params.node.isRowPinned();
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  linkWithInventory() {
    // this.dialog
    //   .openDialog(LinkVariantComponent, {
    //     size: 's',
    //     data: {
    //       variant: this.params.data,
    //     },
    //   })
    //   .subscribe((res) => {
    //     if (res) {
    //     }
    //   });
  }
}
