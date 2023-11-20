import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './components/inventory.component';
import { ProductsListComponent } from './components/products/products.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ProductActionsCell } from './components/products/list-grid/cell-renderers/action.cell';
import { AgGridModule } from 'ag-grid-angular';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/inventory/',
    '.json'
  );
}

@NgModule({
  declarations: [
    InventoryComponent,
    ProductsListComponent,
    FormProductComponent,
    ProductActionsCell,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    InventoryRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class InventoryModule {}
