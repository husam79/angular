//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application.component';
import { AppRoutes } from 'src/core/constant/routes';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
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
      {
        path: '**',
        redirectTo: AppRoutes.Accounting,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
