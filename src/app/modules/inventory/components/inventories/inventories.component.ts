import { Component, OnInit } from '@angular/core';
import { InventoriesGrid } from './list-grid/list-grid.grid';
import { StoreService } from '../../services/store.service';
import { DialogService } from 'src/core/services/dialog.service';
import { FormInventoryComponent } from './form-inventory/form-inventory.component';

@Component({
  selector: 'app-inventories-list',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss'],
})
export class InventoriesListComponent
  extends InventoriesGrid
  implements OnInit
{
  constructor(
    private storeService: StoreService,
    private dialogService: DialogService
  ) {
    super();
  }
  ngOnInit(): void {
    this.storeService.getStores().subscribe((data) => {
      this.setRowData(data);
    });
  }

  onGridReady(e: any) {}
  addInventory() {
    this.dialogService
      .openDialog(FormInventoryComponent, { size: 'm' })
      .subscribe((data) => {
        if (data) {
          this.gridOptions.api?.applyTransaction({ add: [data] });
        }
      });
  }
}
