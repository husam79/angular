//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory.component';
import { AppRoutes } from 'src/core/constant/routes';
import { ProductsListComponent } from './components/products/products.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { InventoriesListComponent } from './components/inventories/inventories.component';
import { StoreProductsListComponent } from './components/inventories/products-list/products-list.component';
import { OutletInventoryComponent } from './components/inventories/outlet-inventory/outlet-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: AppRoutes.Products,

        children: [
          {
            path: '',
            component: ProductsListComponent,
          },
          {
            path: AppRoutes.Add,
            component: FormProductComponent,
          },
          {
            path: ':id',
            children: [
              { path: '', component: ViewProductComponent },
              {
                path: AppRoutes.edit,
                component: FormProductComponent,
              },
            ],
          },
        ],
      },
      {
        path: AppRoutes.InventoriesList,
        component: InventoriesListComponent,
        children: [
          { path: '', component: OutletInventoryComponent },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: StoreProductsListComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
