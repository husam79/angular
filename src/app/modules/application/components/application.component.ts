import { Component } from '@angular/core';
import { TranslateComponent } from 'src/core/components/translate/translate.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent extends TranslateComponent {}
