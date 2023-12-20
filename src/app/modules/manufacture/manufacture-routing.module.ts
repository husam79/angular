//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureComponent } from './components/manufacture.component';

const routes: Routes = [
  {
    path: '',
    component: ManufactureComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManufactureRoutingModule {}
