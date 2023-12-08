import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingComponent } from './components/accounting.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransactionActionsCell } from './components/transactions/list-grid/cell-renderers/actions.cell';
import { TransactionFormComponent } from './components/transactions/transaction-form/transaction-form.component';
import { TransactionDetailsComponent } from './components/transactions/transaction-form/transaction-details/transaction-details.component';
import { TransactionDetailsInput } from './components/transactions/transaction-form/transaction-details/cell-renderers/input.cell';
import { DetailsActionsCell } from './components/transactions/transaction-form/transaction-details/cell-renderers/action.cell';
import { SearchAccountsComponent } from './shared/search-accounts/search-accounts.component';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { CurrencyExchangeComponent } from './components/transactions/currency-exchange/currency-exchange.component';
import { AccountsChartComponent } from './components/accounts-chart/accounts-chart.component';
import { ViewAccountComponent } from './components/accounts-chart/view-account/view-account.component';
import { MainAccountComponent } from './components/accounts-chart/view-account/main-account/main-account.component';
import { SubAccountComponent } from './components/accounts-chart/view-account/sub-account/sub-account.component';
import { BalanceCell } from './shared/cell-renderers/balance.cell';
import { SubAccountCell } from './components/accounts-chart/view-account/main-account/cell-renderers/sub-account.cell';
import { FormAccountComponent } from './components/accounts-chart/form-account/form-account.component';
import { CurrenciesComponent } from './shared/currencies/currencies.component';
import { OutletAccountComponent } from './components/accounts-chart/outlet-account/outlet-account.component';
import { MultiTranslateHttpLoader } from 'src/core/http/translate.http';
import { TransactionViewComponent } from './components/transactions/transaction-view/transaction-view.component';
import { TransactionViewDetailsComponent } from './components/transactions/transaction-view/transaction-details/transaction-details.component';
import { ApplicationModule } from '../application/application.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/accounting/',
    '.json'
  );
}
@NgModule({
  declarations: [
    AccountingComponent,
    TransactionsComponent,
    TransactionActionsCell,
    // TransactionFormComponent,
    // TransactionDetailsComponent,
    TransactionDetailsInput,
    DetailsActionsCell,
    CurrencyExchangeComponent,
    AccountsChartComponent,
    ViewAccountComponent,
    MainAccountComponent,
    SubAccountComponent,
    SubAccountCell,
    FormAccountComponent,
    // CurrenciesComponent,
    OutletAccountComponent,
    TransactionViewComponent,
    TransactionViewDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountingRoutingModule,
    AgGridModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ApplicationModule,
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
export class AccountingModule {}
