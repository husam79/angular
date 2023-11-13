import { Component } from '@angular/core';
import { TranslateComponent } from 'src/core/components/translate/translate.component';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
})
export class AccountingComponent extends TranslateComponent {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.getAllCurrencies();
  }
}
