import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  filter,
  map,
  of,
  skip,
  switchMap,
} from 'rxjs';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
@Component({
  selector: 'app-accounts-chart',
  templateUrl: './accounts-chart.component.html',
  styleUrls: ['./accounts-chart.component.scss'],
})
export class AccountsChartComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  refreshData: boolean | null = null;
  activeNode: any;
  subjectSub: any;
  accountSub?: Subscription;
  refreshSub?: Subscription;
  subject = new Subject();
  data: any[] = [];
  accessTranslation = AppTranslate.Chart;
  private _transformer = (node: Account, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      no: node.no,
      is_main: node.is_main,
      balance: node.balance,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
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
  accounts: Account[] = [];

  ngOnInit(): void {
    this.accountSub = this.accountService.activeAccount
      .pipe(skip(1))
      .subscribe((no: any) => {
        this.findNo(no);
      });
    this.refreshSub = this.accountService.refreshData.subscribe((data) => {
      this.refreshData = !this.refreshData;
      this.activeNode = null;
    });
    this.subjectSub = this.subject
      ?.pipe(
        debounceTime(300),
        switchMap((res: any) => {
          return this.filterForName(res?.target?.value)?.pipe(
            catchError((res) => {
              return of([]);
            })
          );
        }),
        catchError((res) => {
          return of([]);
        })
      )
      .subscribe((res: any) => {
        // this.treeControl.collapseAll();
      });
  }

  findNo(no: string, collapse: boolean = true) {
    if (no) {
      let node = this.findNode(no);
      if (node) {
        if (collapse) this.treeControl.collapseAll();
        this.activeNode = node;
        this.treeControl.expand(node);
        this.expandParents(node);
      }
    }
  }
  getAccounts = () => {
    return this.accountService.chart().pipe(
      tap((data: any) => {
        this.dataSource.data = data;
        this.accountService.accounts = data;
        this.findNo(this.accountService.activeAccount.getValue());
        this.findAndExpand('', this.treeControl.dataNodes);
      })
    );
  };
  filterForName(value: string) {
    return of(1).pipe(
      map((res) => {
        let data = this.accountService.accounts.slice();
        let result = this.filterNodes(data, ({ name }: any) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        this.dataSource.data = result;
        this.findAndExpand(value, this.treeControl.dataNodes);
        this.findNo(this.accountService.activeAccount.getValue(), false);
        return [];
      })
    );
  }
  filterNodes(array: any[], fn: any) {
    return array.reduce((r, o) => {
      var children = this.filterNodes(o.children || [], fn);
      if (fn(o) || children.length)
        r.push(Object.assign({}, o, children.length && { children }));
      return r;
    }, []);
  }
  findAndExpand(v: string, data: any[]) {
    return data.filter((data) => {
      let d = data.name.toLowerCase().includes(v.toLowerCase());
      if (d && v) {
        this.expandParents(data);
      } else if (!v && data.level <= 1) {
        this.treeControl.expand(data);
      }
      return d;
    });
  }
  findNode(no: string) {
    return this.treeControl.dataNodes?.find((data) => data.no == no);
  }

  getDeepWithFilter(event: any) {
    if (event.target.value) this.treeControl.collapseAll();
    this.subject.next(event);
  }
  expandParents(node: any) {
    const parent = this.getParent(node);
    this.treeControl.expand(parent);

    if (parent && parent.level > 0) {
      this.expandParents(parent);
    }
  }
  getParent(node: any) {
    const { treeControl } = this;
    const currentLevel = treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }
    const startIndex = treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];

      if (treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }

  viewSub(node: any) {
    this.activeNode = node;
    this.router.navigate([`${node.no}`], { relativeTo: this.activeRoute });
  }
  newAccount() {
    if (this.activeNode.is_main) {
      this.router.navigate([`new`], {
        relativeTo: this.activeRoute,
        queryParams: { parent_number: this.activeNode.no },
      });
    } else {
      this.router.navigate([`new`], {
        relativeTo: this.activeRoute,
        queryParams: { parent_number: '' },
        queryParamsHandling: 'preserve',
      });
    }
  }
}
