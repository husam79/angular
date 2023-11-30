import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { VariantService } from 'src/app/modules/inventory/services/variant.service';

@Component({
  selector: 'variants-action',
  template: `
    <div class="d-flex-ng" *ngIf="!pinned">
      <button
        mat-icon-button
        class="more-btn"
        color="primary"
        (click)="deleteVariant()"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styles: [``],
})
export class InvoiceVariantActionsCell implements ICellRendererAngularComp {
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
  deleteVariant() {
    let id = this.params.data.id;
    (<FormGroup>(
      this.params.context.parent.invoiceForm?.get('entries')
    )).removeControl(id);
    this.params.api.applyTransaction({ remove: [this.params.data] });
  }
}
