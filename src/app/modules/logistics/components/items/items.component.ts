import { Component, OnInit } from '@angular/core';
import { ItemsGrid } from './list-grid/list-grid.grid';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent extends ItemsGrid implements OnInit {
  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.setRowData(data);
    });
  }
  add() {
    this.router.navigate([`${AppRoutes.Add}`], { relativeTo: this.route });
  }
}
