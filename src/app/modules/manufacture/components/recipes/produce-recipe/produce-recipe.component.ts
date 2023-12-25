import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { AppTranslate } from 'src/core/constant/translation';
import { RecipeService } from '../../../services/recipe.service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-produce-recipe',
  templateUrl: './produce-recipe.component.html',
  styleUrls: ['./produce-recipe.component.scss'],
})
export class ProduceRecipeComponent implements OnInit {
  accessTranslation = AppTranslate.Recipes;
  data: any;
  formGroup?: UntypedFormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      out_variant_required_quantity: fb.control(0),
    });
  }
  ngOnInit(): void {
    this.getParams()
      .pipe(
        switchMap((data) => {
          return this.recipeService.getEstimation(data[1], data[0]['quantity']);
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.formGroup?.patchValue(data);
      });
  }

  getParams = () => {
    return this.route.params.pipe(
      map((data) => data['id']),
      switchMap((data) => {
        return combineLatest([this.route.queryParams, of(data)]);
      })
    );
  };
  save(){

  }
  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  updateQuantity(e: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { quantity: e.target.value },
    });
  }
}
