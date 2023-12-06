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
import { DialogService } from 'src/core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'consignment-status',
  template: `
    <!-- <mat-icon [svgIcon]="status ? 'success' : 'pending'"></mat-icon> -->
    <div class="w-100">
      <div *ngIf="!status" class="pending">
        {{ 'pending' | prefix : accessTranslation | translate }}
      </div>
      <div *ngIf="status" class="fulfilled">
        {{ 'fulfilled' | prefix : accessTranslation | translate }}
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fulfilled {
        width: 100%;
        height: 30px;
        background: var(--success-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .pending {
        width: 100%;
        height: 30px;
        background: orange;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
    `,
  ],
})
export class ConsignmentStatus implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  accessTranslation = AppTranslate.Consignments;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  status = false;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2,
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.status = this.params.data.steps[1]?.is_fulfilled;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
