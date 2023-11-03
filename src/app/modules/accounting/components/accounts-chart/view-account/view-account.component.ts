import { Component } from '@angular/core';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss'],
})
export class ViewAccountComponent {
  accessTranslation = AppTranslate.Chart;
}
