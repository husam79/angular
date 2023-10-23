import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // {
  //   path: '**',
  //   redirectTo: 'authentication',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
