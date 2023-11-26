import { Component, OnInit } from '@angular/core';
import { InventoriesGrid } from './list-grid/list-grid.grid';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-inventories-list',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss'],
})
export class InventoriesListComponent
  extends InventoriesGrid
  implements OnInit
{
  constructor(private storeService: StoreService) {
    super();
  }
  ngOnInit(): void {
    this.storeService.getStores().subscribe((data) => {
      this.setRowData(data);
    });
  }
  onGridReady(e: any) {}
}
