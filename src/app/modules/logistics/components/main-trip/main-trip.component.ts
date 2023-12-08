import { Component, OnInit } from '@angular/core';
import { MainTripGrid } from './list-grid/list-grid.grid';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-main-trip',
  templateUrl: './main-trip.component.html',
  styleUrls: ['./main-trip.component.scss'],
})
export class MainTripComponent extends MainTripGrid implements OnInit {
  ngOnInit(): void {
    this.mainTripService.getMainTrips().subscribe((data) => {
      this.setRowData(data);
    });
  }
  add() {
    this.router.navigate([`${AppRoutes.Add}`], { relativeTo: this.route });
  }
}
