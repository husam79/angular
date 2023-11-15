import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent {
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
  constructor(public coreService: CoreService) {
    this.coreService.getAllCurrencies().subscribe();
  }
}
