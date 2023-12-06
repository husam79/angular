import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/core/services/dialog.service';
import { DeleteEntityComponent } from 'src/core/dialogs/delete-entity/delete-entity.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ProductService } from 'src/app/modules/inventory/services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'transactions-list-actions',
  template: `
    <div class="d-flex-ng">
      <button
        mat-icon-button
        class="more-btn"
        color="primary"
        (click)="deleteItem()"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      ::ng-deep {
        [dir='rtl'] .mat-mdc-menu-item {
          flex-direction: row-reverse !important;
        }
        .mat-mdc-menu-item {
          min-height: 40px !important;
          font-size: 14px !important;
          border-bottom: 1px dashed var(--light-active-accent-color) !important;
          &:last-child {
            border-bottom: none !important;
          }
        }
        .mat-mdc-menu-item.mdc-list-item {
          .mat-icon path {
            fill: var(--primary-color) !important;
          }
        }
        .mat-mdc-menu-content {
          padding: 0 !important;
        }
        .more-actions-menu {
          width: 100% !important;
        }
      }
      .more-btn {
        cursor: pointer;
      }
    `,
  ],
})
export class ConsItemsActionCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private translateService: TranslateService,
    private productService: ProductService,
    private dialog: DialogService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  deleteProduct() {
    this.dialog
      .openDialog(DeleteEntityComponent, {
        size: 'ms',
        data: {
          title: this.translateService.instant(
            AppTranslate.Products + '.delete-product-title'
          ),
          message: this.translateService.instant(
            AppTranslate.Products + '.delete-product-message',
            { name: this.params.data.name }
          ),
        },
      })
      .subscribe((res) => {
        if (res) {
          this.productService
            .deleteProduct(this.params.data.id)
            .subscribe((data) => {
              this.params.api.applyTransaction({
                remove: [this.params.data],
              });
            });
        }
      });
  }
  deleteItem() {
    let id = this.params.data.id;
    (<FormGroup>(
      this.params.context.parent.formGroup?.get('items')
    )).removeControl(id);
    this.params.api.applyTransaction({ remove: [this.params.data] });
  }
}
