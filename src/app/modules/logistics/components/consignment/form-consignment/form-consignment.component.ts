import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
import { ConsignmentService } from '../../../services/consignment.service';
import { Subscription } from 'rxjs';
import { MainTripService } from '../../../services/main-trip.service';

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
  sub?: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consignmentService: ConsignmentService,
    private tripService: MainTripService
  ) {
    this.consignment = fb.group({
      customer_id: fb.control(null),
      calculation_method: fb.control(''),
      number_of_pallets: fb.control(''),
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
      consignment_id: fb.control(''),
      description: fb.control(''),
      cu_notes: fb.control(''),
      items: fb.group({}),
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.consignment.valueChanges.subscribe((data) => {
      if (!data.to_turkey_warehouse) {
        this.consignment.get('tr_is_fulfilled')?.disable({ emitEvent: false });
        this.consignment.get('tr_notes')?.disable({ emitEvent: false });
      }
      if (data.to_turkey_warehouse) {
        this.consignment.get('tr_is_fulfilled')?.enable({ emitEvent: false });
        this.consignment.get('tr_notes')?.enable({ emitEvent: false });
      }
      if (!data.to_customer_warehouse) {
        this.consignment.get('cu_is_fulfilled')?.disable({ emitEvent: false });
        this.consignment.get('cu_notes')?.disable({ emitEvent: false });
      }
      if (data.to_customer_warehouse) {
        this.consignment.get('cu_is_fulfilled')?.enable({ emitEvent: false });
        this.consignment.get('cu_notes')?.enable({ emitEvent: false });
      }
    });
    this.consignmentService.getCalculations().subscribe((data) => {
      this.methods = data;
    });
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.consignmentService.getConsignment(id).subscribe((data) => {
          this.data = data.items;
          this.consignment.patchValue({
            ...data,
            customer_id: data.customer_id.toString(),
            to_germany_warehouse: true,
          });
          if (data.steps) {
            this.consignment.get('tr_is_fulfilled');
          }
        });
      }
    });
    this.tripService.getMainTrips().subscribe((data) => {
      this.cons = data;
    });
  }
  get account() {
    return this.consignment.get('customer_id');
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

    if (!this.id)
      this.consignmentService
        .addConsignment({
          consignment: this.consignment.getRawValue(),
          items: items,
        })
        .subscribe((data) => {
          this.cancel();
        });
    else {
      this.consignmentService
        .editConsignment({
          consignment: {
            ...this.consignment.getRawValue(),
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
    if (!this.id) this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
    // this.dialogService.openDialog(TransactionDialog).subscribe();
  }
}
