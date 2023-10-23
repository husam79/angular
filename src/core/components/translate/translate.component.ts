import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
@Component({
  selector: 'app-translate',
  template: ``,
  styleUrls: [],
})
export class TranslateComponent implements OnInit {
  protected translate: TranslateService = inject(TranslateService);

  constructor() {}
  ngOnInit(): void {
    this.translate.setDefaultLang('english');
    this.translate.use('english');
  }
}
