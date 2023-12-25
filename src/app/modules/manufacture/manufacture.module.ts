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
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeActionsCell } from './components/recipes/list-grid/cell-renderers/action.cell';
import { FormRecipeComponent } from './components/recipes/form-recipe/form-recipe.component';
import { RecipeVariantInput } from './components/recipes/form-recipe/form-variant/cell-renderer/variant-input.cell';
import { RecipeVariantActionsCell } from './components/recipes/form-recipe/form-variant/cell-renderer/action.cell';
import { SearchVariantsComponent } from '../inventory/shared/search-variants/search-variants.component';
import { FormRecipeVariantComponent } from './components/recipes/form-recipe/form-variant/form-variant.component';
import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { ViewRecipeVariantComponent } from './components/recipes/view-recipe/view-variant/view-variant.component';
import { ProduceRecipeComponent } from './components/recipes/produce-recipe/produce-recipe.component';
import { VariantsTreeComponent } from './components/recipes/produce-recipe/variants-tree/variants-tree.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/manufacture/',
    '.json'
  );
}

@NgModule({
  declarations: [
    ManufactureComponent,
    RecipesComponent,
    RecipeActionsCell,
    FormRecipeComponent,
    RecipeVariantInput,
    RecipeVariantActionsCell,
    FormRecipeVariantComponent,
    ViewRecipeComponent,
    ViewRecipeVariantComponent,
    ProduceRecipeComponent,
    VariantsTreeComponent,
  ],
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
