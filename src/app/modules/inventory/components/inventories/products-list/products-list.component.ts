import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import {
  BehaviorSubject,
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
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';

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
  formGroup!: UntypedFormGroup;
  editId: string = '';
  id: string = '';
  name: string = '';
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      unit: node.uom,
      price: node.unit_price,
      quantity: node.quantity,
      value: node.value,
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
    (node) => node.children
  );
  hasChild = (_: number, node: any) => node.expandable;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private inventoryService: InventoryService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      quantity: fb.control(0, [Validators.required]),
    });
  }
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
    this.getRouteParams().subscribe((id: string) => {
      this.storeService.getStore(+id).subscribe((data) => {
        this.name = data.name;
      });
    });
  }

  getRouteParams = () => {
    return this.route.params.pipe(
      tap((data) => {
        this.id = data['id'];
      }),
      map((data) => data['id'])
    );
  };
  getProducts = (res: any) => {
    return this.inventoryService.getVariants(res).pipe(
      tap((data) => {
        let grouping = this.groupProduct(data);
        this.dataSource.data = grouping;
        this.treeControl.expandAll()
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
  editQuantity(node: any) {
    node['edit'] = !node['edit'];
    this.editId = node['variant_id'];
    this.formGroup.get('quantity')?.patchValue(node.quantity);
  }
  save(node: any) {
    this.inventoryService
      .adjustQuantity({
        store_id: this.id,
        variant_id: node.variant_id,
        quantity: this.formGroup.get('quantity')?.value,
      })
      .subscribe((data) => {
        this.editId = '';
        node['edit'] = false;
        node['quantity'] = this.formGroup.get('quantity')?.value;
      });
  }
  cancel(node: any) {
    this.editId = '';
    node['edit'] = false;
  }
  toggleWidth(){
    this.inventoryService.expanded.next(  ! this.inventoryService.expanded.getValue())
  }
}
