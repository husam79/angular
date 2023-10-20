//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      //   {
      //     path: 'login',
      //     component: LoginComponent,
      //   },
      //   {
      //     path: '**',
      //     redirectTo: 'login',
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
