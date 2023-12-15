//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticsComponent } from './components/logistics.component';
import { AppRoutes } from 'src/core/constant/routes';
import { ItemsComponent } from './components/items/items.component';
import { FormItemComponent } from './components/items/form-item/form-item.component';
import { ViewItemComponent } from './components/items/view-item/view-item.component';
import { ConsignmentComponent } from './components/consignment/consignment.component';
import { FormConsignmentComponent } from './components/consignment/form-consignment/form-consignment.component';
import { MainTripComponent } from './components/main-trip/main-trip.component';
import { FormTripComponent } from './components/main-trip/form-trip/form-trip.component';
import { ViewTripComponent } from './components/main-trip/view-trip/view-trip.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticsComponent,
    children: [
      {
        path: AppRoutes.Items,
        children: [
          { path: '', component: ItemsComponent },
          { path: AppRoutes.Add, component: FormItemComponent },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: ViewItemComponent,
              },
              { path: AppRoutes.edit, component: FormItemComponent },
            ],
          },
        ],
      },
      {
        path: AppRoutes.Consignments,
        children: [
          {
            path: '',
            component: ConsignmentComponent,
          },
          {
            path: AppRoutes.Add,
            component: FormConsignmentComponent,
          },
          {
            path: ':id',
            children: [
              //   {
              //   path:'',
              //   co
              // },
              { path: AppRoutes.edit, component: FormConsignmentComponent },
            ],
          },
        ],
      },
      {
        path: AppRoutes.MainTrips,
        children: [
          { path: '', component: MainTripComponent },
          {
            path: AppRoutes.Add,
            component: FormTripComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: ViewTripComponent,
              },
              { path: AppRoutes.edit, component: FormTripComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticsRoutingModule {}
