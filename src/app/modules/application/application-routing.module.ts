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
