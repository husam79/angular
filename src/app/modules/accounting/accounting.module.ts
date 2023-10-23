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
    TransactionFormComponent,
    TransactionDetailsComponent,
    TransactionDetailsInput,
    DetailsActionsCell,
    SearchAccountsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountingRoutingModule,
    AgGridModule,

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
export class AccountingModule {}
