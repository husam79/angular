import { Component, OnInit } from '@angular/core';
import { MainTripService } from '../../../services/main-trip.service';
import { ConsignmentService } from '../../../services/consignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-consignment',
  templateUrl: './view-consignment.component.html',
  styleUrls: ['./view-consignment.component.scss'],
})
export class ViewConsignmentComponent implements OnInit {
  id: string = '';
  consignment: any;
  data?: any[];
  accessTranslation = AppTranslate.Consignments;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private consignmentService: ConsignmentService,
    private tripService: MainTripService,
    private _location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.consignmentService.getConsignment(id).subscribe((data) => {
          this.consignment = data;
          data.items.forEach((d: any) => {
            d['manufacturer_address'] = d.manufacturerAddress;
            return d;
          });
          this.data = data.items;
        });
      }
    });
  }
  cancel() {
    if (this.route.snapshot.queryParams['trip']) {
      this._location.back();
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
