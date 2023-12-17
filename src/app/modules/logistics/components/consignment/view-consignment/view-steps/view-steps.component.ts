import { Component, Input } from '@angular/core';
import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';
import { AppTranslate } from 'src/core/constant/translation';
import { DialogService } from 'src/core/services/dialog.service';

@Component({
  selector: 'consignment-view-steps',
  templateUrl: './view-steps.component.html',
  styleUrls: ['./view-steps.component.scss'],
})
export class ViewStepsComponent {
  accessTranslation = AppTranslate.Consignments;
  @Input('data') data: any;
  constructor(private dialogService: DialogService) {}
  transaction(step_index: number) {
    let id =
      step_index == 1
        ? this.data.tr_transaction_id
        : this.data.cu_transaction_id;
    this.dialogService
      .openDialog(TransactionDialog, {
        data: {
          id,
        },
        size: 'l',
      })
      .subscribe((dd) => {});
  }
}
