import { Component, OnInit } from '@angular/core';
import { MainTripService } from '../../../services/main-trip.service';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/core/services/dialog.service';
import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-trip',
  templateUrl: './view-trip.component.html',
  styleUrls: ['./view-trip.component.scss'],
})
export class ViewTripComponent implements OnInit {
  accessTranslation = AppTranslate.MainTrip;
  id: string = '';
  data: any;
 tripCosts=0;
 consignment=0;
 revenues=0;
 result=0;
  constructor(
    private mainTripService: MainTripService,
    public route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mainTripService.getTrip(this.id).subscribe((data) => {
      this.data = data;
      data.consignments.forEach((element:any) => {
        this.consignment+=(element.total_cost  )
        this.revenues+=element.amount_due
      });
      this.result=this.revenues-(this.consignment+data.trip_cost)
    });
  }
  transaction(name: string) {
    this.dialogService
      .openDialog(TransactionDialog, {
        data: {
          id: this.data[name],
        },
        size: 'l',
      })
      .subscribe((data) => {});
  }
  downloadExcel() {
    this.mainTripService.getPackingList(+this.id).subscribe((res) => {
      saveAs(res.body, 'Packing list');
    });
  }
  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
