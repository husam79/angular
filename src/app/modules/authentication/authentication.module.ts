//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';

//Components
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/core/shared.module';
import { AuthenticationComponent } from './components/authentication.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/authentication/',
    '.json'
  );
}
@NgModule({
  declarations: [LoginComponent, AuthenticationComponent, ChangePasswordComponent],
  imports: [
    AuthenticationRoutingModule,
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
})
export class AuthenticationModule {}
