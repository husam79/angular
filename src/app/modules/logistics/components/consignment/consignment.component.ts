import { Component, OnInit } from '@angular/core';
import { ConsignmentGrid } from './list-grid/list-grid.grid';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.scss'],
})
export class ConsignmentComponent extends ConsignmentGrid implements OnInit {
  ngOnInit(): void {
    this.consignmentService.getConsignments().subscribe((data) => {
      this.setRowData(data);
    });
  }
  add() {
    this.router.navigate([`${AppRoutes.Add}`], { relativeTo: this.route });
  }
}
