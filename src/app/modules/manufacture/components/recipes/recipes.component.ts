import { Component, OnInit } from '@angular/core';
import { RecipesGrid } from './list-grid/list-grid.grid';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent extends RecipesGrid implements OnInit {
  constructor(private recipeService: RecipeService) {
    super();
  }
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      this.setRowData(data);
    });
  }
  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
