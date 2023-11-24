import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchAccountsComponent } from '../accounting/shared/search-accounts/search-accounts.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/application/', '.json');
}

@NgModule({
  declarations: [
    ApplicationComponent,
    SidebarComponent,
    BreadCrumbComponent,
    OutletComponent,
    NavbarComponent,
    SearchAccountsComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [SearchAccountsComponent],
})
export class ApplicationModule {}
