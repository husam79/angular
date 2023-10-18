import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _translateService: TranslateService) {}
  ngOnInit(): void {
    this.setDefaultLang();
  }
  setDefaultLang() {
    this._translateService.setDefaultLang('english');
    this._translateService.use('english');
  }
}
