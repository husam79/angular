//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './components/accounting.component';
import { AppRoutes } from 'src/core/constant/routes';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionFormComponent } from './components/transactions/transaction-form/transaction-form.component';
import { CurrencyExchangeComponent } from './components/transactions/currency-exchange/currency-exchange.component';
import { AccountsChartComponent } from './components/accounts-chart/accounts-chart.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      {
        path: AppRoutes.Transactions,
        children: [
          {
            path: '',
            component: TransactionsComponent,
          },
          {
            path: AppRoutes.Add,
            component: TransactionFormComponent,
          },

          {
            path: AppRoutes.edit + '/:id',
            component: TransactionFormComponent,
          },
          {
            path: AppRoutes.CurrencyExchange,
            component: CurrencyExchangeComponent,
          },
        ],
      },
      {
        path: AppRoutes.AccountCharts,
        component: AccountsChartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
