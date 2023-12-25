import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent implements OnInit {
  id: string = '';
  data: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.getRecipe(this.id).subscribe((recipe) => {
      this.data = recipe;
    });
  }
  accessTranslation = AppTranslate.Recipes;
  edit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
