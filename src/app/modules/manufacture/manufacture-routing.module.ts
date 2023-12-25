//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureComponent } from './components/manufacture.component';
import { AppRoutes } from 'src/core/constant/routes';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FormRecipeComponent } from './components/recipes/form-recipe/form-recipe.component';

import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { ProduceRecipeComponent } from './components/recipes/produce-recipe/produce-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: ManufactureComponent,
    children: [
      {
        path: AppRoutes.Recipes,

        children: [
          {
            path: '',
            component: RecipesComponent,
          },
          {
            path: AppRoutes.Add,
            component: FormRecipeComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: ViewRecipeComponent,
              },
              {
                path: AppRoutes.edit,
                component: FormRecipeComponent,
              },
              {
                path: AppRoutes.Produce,
                component: ProduceRecipeComponent,
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
export class ManufactureRoutingModule {}
