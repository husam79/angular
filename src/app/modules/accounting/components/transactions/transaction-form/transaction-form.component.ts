import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreComponent } from 'src/core/components/core.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent extends CoreComponent implements OnInit {
  accessTranslation = AppTranslate.Transactions;
  activeRouter: ActivatedRoute = inject(ActivatedRoute);
  transactionForm!: FormGroup;
  id?: number;
  fb: FormBuilder = inject(FormBuilder);
  constructor() {
    super();

    this.transactionForm = this.fb.group({
      date: this.fb.control(null, []),
      currency: this.fb.control(null, []),
      description: this.fb.control(null, []),
      details: this.fb.group({}),
    });
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((param) => {
      this.id = param['id'];
    });
  }
  save() {
    console.log(this.transactionForm.get('details')?.value);
  }
}
