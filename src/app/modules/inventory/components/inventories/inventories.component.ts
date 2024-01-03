import { Component, OnInit } from '@angular/core';
import { InventoriesGrid } from './list-grid/list-grid.grid';
import { StoreService } from '../../services/store.service';
import { DialogService } from 'src/core/services/dialog.service';
import { FormInventoryComponent } from './form-inventory/form-inventory.component';
import { Subscription } from 'rxjs';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventories-list',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss'],
})
export class InventoriesListComponent
  extends InventoriesGrid
  implements OnInit
{
  sub?:Subscription
expanded=true;
  constructor(
    public inventoryService:InventoryService,
    private storeService: StoreService,
    private dialogService: DialogService
  ) {
    super();
  }
  ngOnInit(): void {
    this.sub=this.inventoryService.expanded.subscribe((data)=>{
this.expanded=data
    })
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
