import { BreakpointObserver } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import { SECTIONS } from 'src/core/constant/sections';
import { Section } from 'src/core/interfaces/section.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit, OnInit, OnChanges {
  activeNode: any;
  @ViewChild('menuTrigger') matMenu?: MatMenuTrigger;
  @Input('state') state?: boolean;
  isMobile = true;

  private _transformer = (node: Section, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      svg: node.svg,
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
  constructor(private observer: BreakpointObserver, private router: Router) {
    this.dataSource.data = SECTIONS;
    console.log(this.treeControl.dataNodes);
  }
  ngAfterViewInit() {
    if (!this.isMobile) this.treeControl.expandAll();
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 1200px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.treeControl.collapseAll();
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      (changes['state'].currentValue === false ||
        changes['state'].currentValue === true)
    ) {
      this.isMobile = !this.isMobile;
      if (this.isMobile) this.treeControl.collapseAll();
      else this.treeControl.expandAll();
    }
  }

  toggle(node: any, menu: any) {
    if (!this.isMobile) {
      this.treeControl.toggle(node);
      menu?.closeMenu();
    }
  }
  children(node: any) {
    return this.treeControl.getDescendants(node);
  }
  navigate(route: string) {
    console.log(route);
    this.router.navigate([route]);
  }
}
