import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

@Component({
  selector: 'app-accounts-chart',
  templateUrl: './accounts-chart.component.html',
  styleUrls: ['./accounts-chart.component.scss'],
})
export class AccountsChartComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  activeNode: any;
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
    if (this.accountService.accounts.length == 0)
      this.accountService.chart().subscribe((data) => {
        this.dataSource.data = data;
        this.accountService.accounts = data;
      });
  }
}
