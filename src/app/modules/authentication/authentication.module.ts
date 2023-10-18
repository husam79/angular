//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';

//Components
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/core/shared.module';
import { AuthenticationComponent } from './components/authentication.component';

@NgModule({
  declarations: [LoginComponent, AuthenticationComponent],
  imports: [AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
