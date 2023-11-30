import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { InventoryService } from '../../../services/inventory.service';
import { CustomTree } from 'src/core/components/custom-tree/custom-tree.component';

@Component({
  selector: 'store-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class StoreProductsListComponent implements OnInit {
  accessTranslation = AppTranslate.Products;
  data: any[] = [];
  subject = new Subject();
  searchSub?: Subscription;
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      unit: node.uom,
      price: node.unit_price,
      quantity: node.quantity,
      value: node.value,

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
    (node) => node.children
  );
  hasChild = (_: number, node: any) => node.expandable;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.searchSub = this.subject
      ?.pipe(
        debounceTime(300),
        switchMap((res: any) => {
          return this.filterForName(res?.target?.value)?.pipe(
            catchError((res) => {
              return of([]);
            })
          );
        })
      )
      .subscribe();
  }

  getRouteParams = () => {
    return this.route.params.pipe(map((data) => data['id']));
  };
  getProducts = (res: any) => {
    return this.inventoryService.getVariants(res).pipe(
      tap((data) => {
        let grouping = this.groupProduct(data);
        this.dataSource.data = grouping;
        this.data = grouping;
      })
    );
  };
  filterForName(value: string) {
    return of(1).pipe(
      map((res) => {
        let data = this.data.slice();
        let result = this.treeControl.filterNodes(data, ({ name }: any) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        this.dataSource.data = result;
        this.treeControl.findAndExpand(
          value,
          this.treeControl.dataNodes,
          ({ name }: any) => name.toLowerCase().includes(value.toLowerCase())
        );
        return [];
      })
    );
  }

  getDeepWithFilter(event: any) {
    if (event.target.value) this.treeControl.collapseAll();
    this.subject.next(event);
  }

  groupProduct(products: any[]) {
    let groups = products.reduce(function (obj, item) {
      obj[item.product_name] = obj[item.product_name] || [];
      obj[item.product_name].push(item);
      return obj;
    }, {});
    let result = Object.keys(groups).map((group) => {
      return {
        name: group,
        store_name: groups[group][0]?.store_name,
        children: groups[group],
      };
    });
    return result;
  }
}
