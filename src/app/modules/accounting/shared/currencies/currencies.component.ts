import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
// import { AccountService } from '../../services/account.service';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  @Input() currencyControl: any;
  @Input() group: any;
  @Input() name: any;
  @Input() label: string = '';
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column' = 'd-flex-column-normal';
  @Output() selectionChange = new EventEmitter();
  required: boolean = false;
  constructor(public coreService: CoreService) {
    this.coreService.getAllCurrencies().subscribe();
  }
  ngOnInit(): void {
    let control = this.group?.get(this.name);
    if (control) {
      this.required = control.hasValidator(Validators.required);
    }
  }
}
