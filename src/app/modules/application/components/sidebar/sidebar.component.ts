import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, AfterViewInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { SECTIONS } from 'src/core/constant/sections';
import { Section } from 'src/core/interfaces/section.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  activeNode: any;
  private _transformer = (node: Section, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
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
  constructor() {
    this.dataSource.data = SECTIONS;
    console.log(this.treeControl);
  }
  ngAfterViewInit() {
    // this.treeControl.expand(this.treeControl.dataNodes[0]); // <-- open root node
    this.treeControl.expandAll(); // <-- open node 1
  }
  log(c: any) {
    console.log(c);
  }
}
