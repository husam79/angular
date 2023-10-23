import { Component } from '@angular/core';
import { TranslateComponent } from 'src/core/components/translate/translate.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
})
export class AccountingComponent extends TranslateComponent {
  constructor() {
    super();
    console.log('hello');
  }
}
