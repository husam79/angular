import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
  inject,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { InvoiceService } from 'src/app/modules/inventory/services/invoice.service';

@Component({
  selector: 'invoice-status',
  template: `
    <mat-icon
      [svgIcon]="params.value ? 'success' : 'pending'"
      [matTooltip]="
        (params.value ? 'transferred' : 'untransferred')
          | prefix : accessTranslation
          | translate
      "
      [ngStyle]="{ cursor: !params.value ? 'pointer' : 'initial' }"
      [matTooltipPosition]="'right'"
      [matTooltipShowDelay]="200"
      (click)="transfer()"
    ></mat-icon>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class InvoiceStatus implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  pinned: boolean = false;
  accessTranslation = AppTranslate.Invoices;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  key: string = '';
  field: string = '';
  parent: any;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2,
    private invoiceService: InvoiceService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  transfer() {
    if (!this.params.data.is_transfered) {
      if (this.params.context.parent?.isPurchase)
        this.invoiceService
          .transferPurchase({ id: this.params.data.id })
          .subscribe((data) => {
            this.params.api.applyTransaction({
              update: [{ ...this.params.data, is_transfered: 1 }],
            });
          });
      else {
        this.invoiceService
          .transferSale({ id: this.params.data.id })
          .subscribe((data) => {});
      }
    }
  }
}
