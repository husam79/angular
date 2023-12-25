import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/modules/inventory/services/store.service';
import { RecipeService } from 'src/app/modules/manufacture/services/recipe.service';
import { CustomTree } from 'src/core/components/custom-tree/custom-tree.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'recipe-variants-tree',
  templateUrl: './variants-tree.component.html',
  styleUrls: ['./variants-tree.component.scss'],
})
export class VariantsTreeComponent implements OnChanges {
  accessTranslation = AppTranslate.Recipes;
  formGroup!: UntypedFormGroup;
  editId: string = '';
  id: string = '';
  name: string = '';
  @Input() data?: any[];
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.contents && node.contents.length > 0,
      name: node.variant_name,
      unit: node.uom,
      price: node.price,
      quantity: node.quantity,
      currency_id: node.currency_id,
      uom: node.uom,
      variant_id: node.variant_id,
      level: level,
    };
  };
  activeNode: any;
  treeControl = new CustomTree(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.contents
  );
  hasChild = (_: number, node: any) => node.expandable;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private recipeService: RecipeService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue) {
      this.dataSource.data = changes['data']?.currentValue;
    }
  }
}
