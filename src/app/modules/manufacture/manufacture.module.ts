import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AgGridModule } from 'ag-grid-angular';

import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { ApplicationModule } from '../application/application.module';
import { ManufactureComponent } from './components/manufacture.component';
import { ManufactureRoutingModule } from './manufacture-routing.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/logistics/',
    '.json'
  );
}

@NgModule({
  declarations: [ManufactureComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    ManufactureRoutingModule,
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
export class ManufacturesModule {}
