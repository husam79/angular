import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreComponent } from 'src/core/components/core.component';
import { AppTranslate } from 'src/core/constant/translation';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../../../services/transaction.service';
@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
  providers: [DatePipe],
})
export class TransactionViewComponent extends CoreComponent implements OnInit {
  accessTranslation = AppTranslate.Transactions;
  activeRouter: ActivatedRoute = inject(ActivatedRoute);
  details?: any;
  entries: any[] = [];
  accounts = [];
  id?: number;
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    public route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    super();
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id) {
        this.transactionService.getTransaction(this.id).subscribe((data) => {
          this.details = data;
          this.entries = data.entries;
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/accounting/transactions']);
  }
}
