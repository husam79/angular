import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-translate',
  template: ``,
  styleUrls: [],
})
export class TranslateComponent implements OnInit {
  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
    this.translate.setDefaultLang('english');
    this.translate.use('english');
  }
}
