import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
import { ConsignmentService } from '../../../services/consignment.service';
import { Subscription } from 'rxjs';
import { MainTripService } from '../../../services/main-trip.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-form-consignment',
  templateUrl: './form-consignment.component.html',
  styleUrls: ['./form-consignment.component.scss'],
})
export class FormConsignmentComponent implements OnDestroy {
  accessTranslation = AppRoutes.Consignments;
  id: string = '';
  consignment!: UntypedFormGroup;

  methods = [];
  data: any[] = [];
  cons: any[] = [];
  totalNet = 0;
  totalGross = 0;
  sub?: Subscription;
  itemSub?: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consignmentService: ConsignmentService,
    private tripService: MainTripService,
    private _location: Location
  ) {
    this.consignment = fb.group({
      consignment: fb.group({
        acc_no: fb.control(null, [Validators.required]),
        calculation_method: fb.control('', [Validators.required]),
        number_of_pallets: fb.control(0),
        price_unit: fb.control(0),
        to_turkey_warehouse: fb.control(false),
        tr_transaction_id: fb.control(0),
        tr_is_fulfilled: fb.control(false),
        tr_notes: fb.control(''),
        to_germany_warehouse: fb.control({ value: true, disabled: true }),
        gr_transaction_id: fb.control(0),
        gr_is_fulfilled: fb.control(false),
        gr_notes: fb.control(''),
        to_customer_warehouse: fb.control(false),
        cu_transaction_id: fb.control(0),
        cu_is_fulfilled: fb.control(false),
        main_trip_id: fb.control(null),
        description: fb.control(' '),
        cu_warehouse_address: fb.control(''),
        amount_due: fb.control({ value: 0, disabled: true }),
        cu_notes: fb.control(''),
      }),

      items: fb.group({}),
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.itemSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.itemSub = this.consignment
      .get('items')
      ?.valueChanges.subscribe((value) => {
        let net = 0;
        let gross = 0;
        Object.keys(value).map((item) => {
          net += +value[item].net_weight;
          gross += +value[item].gross_weight;
        });
        this.totalGross = gross;
        this.totalNet = net;
        this.calcDueAmount(this.innerForm?.value);
      });
    this.sub = this.consignment
      .get('consignment')
      ?.valueChanges.subscribe((data) => {
        if (!data.to_turkey_warehouse) {
          this.consignment
            .get('tr_is_fulfilled')
            ?.disable({ emitEvent: false });
          this.consignment.get('tr_notes')?.disable({ emitEvent: false });
        }
        if (data.to_turkey_warehouse) {
          this.consignment.get('tr_is_fulfilled')?.enable({ emitEvent: false });
          this.consignment.get('tr_notes')?.enable({ emitEvent: false });
        }
        if (!data.to_customer_warehouse) {
          this.consignment
            .get('cu_is_fulfilled')
            ?.disable({ emitEvent: false });
          this.consignment.get('cu_notes')?.disable({ emitEvent: false });
        }
        if (data.to_customer_warehouse) {
          this.consignment.get('cu_is_fulfilled')?.enable({ emitEvent: false });
          this.consignment.get('cu_notes')?.enable({ emitEvent: false });
        }
        this.calcDueAmount(data);
      });
    this.consignmentService.getCalculations().subscribe((data) => {
      this.methods = data;
    });
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.consignmentService.getConsignment(id).subscribe((data) => {
          data.items.forEach((d: any) => {
            d['manufacturer_address'] = d.manufacturerAddress;
            return d;
          });
          this.data = data.items;
          this.consignment.get('consignment')?.patchValue({
            ...data,
            to_germany_warehouse: true,
          });
        });
      }
    });
    this.tripService.getMainTrips().subscribe((data) => {
      this.cons = data;
    });
  }
  get account() {
    return this.consignment?.get('consignment')?.get('acc_no');
  }
  get innerForm() {
    return this.consignment?.get('consignment') as UntypedFormGroup;
  }

  calcDueAmount(value: any) {
    let result = 0;
    if (value.calculation_method == 'pallets') {
      result = value.price_unit * value.number_of_pallets;
    }
    if (value.calculation_method == 'net-weight') {
      result = value.price_unit * this.totalNet;
    }
    if (value.calculation_method == 'gross-weight') {
      result = value.price_unit * this.totalGross;
    }
    this.innerForm?.get('amount_due')?.setValue(result, { emitEvent: false });
  }
  save() {
    if (this.consignment.invalid) return;
    let items: any[] = [];
    Object.keys(this.consignment.value.items).map((object) => {
      if (!this.consignment.value.items[object]['id'])
        delete this.consignment.value.items[object]['id'];
      items.push({
        ...this.consignment.value.items[object],
      });
    });

    if (!this.id) {
      let d = this.consignment?.get('consignment')?.getRawValue();
      delete d['amount_due'];
      this.consignmentService
        .addConsignment({
          consignment: d,
          items: items,
        })
        .subscribe((data) => {
          this.cancel();
        });
    } else {
      let d = this.consignment?.get('consignment')?.getRawValue();
      delete d['amount_due'];
      this.consignmentService
        .editConsignment({
          consignment: {
            ...d,
            id: this.id,
          },
          items: items,
        })
        .subscribe((data) => {
          this.cancel();
        });
    }
  }
  cancel() {
    if (this.route.snapshot.queryParams['trip']) {
      this._location.back();
    }
    if (!this.id) this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
    // this.dialogService.openDialog(TransactionDialog).subscribe();
  }
}
