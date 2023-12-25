import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class RecipeService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'manufacturing/recipes');
  }
  getEstimation(id: string, quantity: string) {
    return this.readEntities('estimation/calculate', {
      recipe_id: id,
      required_quantity: quantity,
    });
  }
  getRecipes() {
    return this.readEntities('');
  }
  getRecipe(id: string) {
    return this.readEntity('', id);
  }
  addRecipe(form: any) {
    return this.createEntity('', form);
  }
  editRecipe(form: any) {
    return this.updateEntity('', form);
  }
  deleteRecipe(body: any) {
    return this.deleteEntity('', body);
  }
}
