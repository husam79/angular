//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application.component';
import { AppRoutes } from 'src/core/constant/routes';
import { OutletComponent } from './components/outlet/outlet.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        component: OutletComponent,
      },
      {
        path: AppRoutes.Accounting,
        loadChildren: () =>
          import('../accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
      {
        path: AppRoutes.Inventory,
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
      {
        path: AppRoutes.Logistics,
        loadChildren: () =>
          import('../logistics/logistics.module').then(
            (m) => m.LogisticsModule
          ),
      },
      //   {
      //     path: 'login',
      //     component: LoginComponent,
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
