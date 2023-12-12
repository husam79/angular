import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AgGridModule } from 'ag-grid-angular';

import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { ApplicationModule } from '../application/application.module';
import { LogisticsRoutingModule } from './logistics-routing.module';
import { LogisticsComponent } from './components/logistics.component';
import { ItemsComponent } from './components/items/items.component';
import { FormItemComponent } from './components/items/form-item/form-item.component';
import { ItemActionsCell } from './components/items/list-grid/cell-renderers/action.cell';
import { ViewItemComponent } from './components/items/view-item/view-item.component';
import { ConsignmentComponent } from './components/consignment/consignment.component';
import { ConsignmentStatus } from './components/consignment/list-grid/cell-renderers/status.cell';
import { FormConsignmentComponent } from './components/consignment/form-consignment/form-consignment.component';
import { FormItemsComponent } from './components/consignment/form-consignment/form-items/form-items.component';
import { FormStepsComponent } from './components/consignment/form-consignment/form-steps/form-steps.component';
import { ItemInput } from './components/consignment/form-consignment/form-items/cell-renderers/item-input.cell';
import { ConsItemsActionCell } from './components/consignment/form-consignment/form-items/cell-renderers/action.cell';
import { ConsignActionsCell } from './components/consignment/list-grid/cell-renderers/actions.cell';
import { MainTripComponent } from './components/main-trip/main-trip.component';
import { FormTripComponent } from './components/main-trip/form-trip/form-trip.component';
import { TripActionsCell } from './components/main-trip/list-grid/cell-renderers/action.cell';
import { MainTripGrid } from './components/main-trip/list-grid/list-grid.grid';
import { ViewConsignmentsComponent } from './components/main-trip/view-consignments/view-consignments.component';
import { TripConsActionsCell } from './components/main-trip/view-consignments/cell-renderers/action.cell';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/logistics/',
    '.json'
  );
}

@NgModule({
  declarations: [
    LogisticsComponent,
    ItemsComponent,
    FormItemComponent,
    ItemActionsCell,
    ViewItemComponent,
    ConsignmentComponent,
    ConsignmentStatus,
    FormConsignmentComponent,
    FormItemsComponent,
    FormStepsComponent,
    ItemInput,
    ConsItemsActionCell,
    ConsignActionsCell,
    MainTripComponent,
    FormTripComponent,
    TripActionsCell,
    ViewConsignmentsComponent,
    TripConsActionsCell,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    LogisticsRoutingModule,
    ApplicationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [provideNgxMask()],
})
export class LogisticsModule {}
