import { Component, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent {
  @Input() currencyControl: any;
  constructor(public coreService: CoreService) {
    this.coreService.getAllCurrencies().subscribe();
  }
}
