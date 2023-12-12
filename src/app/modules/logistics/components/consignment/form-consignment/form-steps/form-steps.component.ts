import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';
import { ConsignmentService } from 'src/app/modules/logistics/services/consignment.service';
import { AppRoutes } from 'src/core/constant/routes';
import { DialogService } from 'src/core/services/dialog.service';

@Component({
  selector: 'consignment-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss'],
})
export class FormStepsComponent {
  accessTranslation = AppRoutes.Consignments;
  @Input('formGroup') formGroup!: FormGroup;
  @Input('id') id: string = '';
  constructor(
    private dialogService: DialogService,
    private consignmentService: ConsignmentService
  ) {}
  transaction(step_index: number) {
    let id =
      step_index == 1
        ? this.formGroup.get('tr_transaction_id')?.value
        : this.formGroup.get('cu_transaction_id')?.value;
    this.dialogService
      .openDialog(TransactionDialog, {
        data: {
          id,
        },
        size: 'l',
      })
      .subscribe((dd) => {
        if (dd && !id)
          this.consignmentService
            .performPayment({ id: +this.id, step_index, trans_id: dd })
            .subscribe((data) => {
              if (step_index == 1) {
                if (typeof dd == 'string')
                  this.formGroup.get('tr_transaction_id')?.setValue(dd);
              } else {
                if (typeof dd == 'string')
                  this.formGroup.get('cu_transaction_id')?.setValue(dd);
              }
            });
      });
  }
  flipTrip(e: any, step_index: number) {
    let checked = e.target.checked;
    if (step_index === 1) {
      this.formGroup.get('to_turkey_warehouse')?.patchValue(!checked);
    }
    if (step_index === 3) {
      this.formGroup.get('to_customer_warehouse')?.patchValue(!checked);
    }

    e.preventDefault();
    this.consignmentService
      .selectStep({
        id: +this.id,
        step_index,
        is_selected: checked == true ? 1 : 0,
      })
      .subscribe((data) => {
        if (step_index === 1) {
          this.formGroup.get('to_turkey_warehouse')?.patchValue(checked);
        }
        if (step_index === 3) {
          this.formGroup.get('to_customer_warehouse')?.patchValue(checked);
        }
      });
  }
}
