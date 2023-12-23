import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppTranslate } from 'src/core/constant/translation';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.scss'],
})
export class FormRecipeComponent {
  id: string = '';
  accessTranslation = AppTranslate.Recipes;
  recipeForm!: UntypedFormGroup;
  data: any[] = [];
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipeForm = fb.group({
      id: fb.control(null),
      name: fb.control(null, [Validators.required]),
      variants: fb.group({}),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.recipeService.getRecipe(id).subscribe((data) => {
          this.recipeForm.patchValue(data);
          this.data = data.entries;
        });
      }
    });
  }
  save() {
    if (this.recipeForm.invalid) return;
    let data = this.recipeForm.value;
    let variants = [];
    for (let variant in data.variants) {
      if (data.variants[variant].new) delete data.variants[variant]['id'];
      variants.push(data.variants[variant]);
    }
    data['entries'] = variants;
    if (!this.id)
      this.recipeService.addRecipe(data).subscribe((data) => {
        this.cancel();
      });
    else {
      this.recipeService.editRecipe(data).subscribe((data) => {
        this.cancel();
      });
    }
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
