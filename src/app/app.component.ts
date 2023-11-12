import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
import { ICONS } from 'src/core/constant/icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _matIconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.setDefaultLang();
    this.loadIcons();
  }
  loadIcons() {
    ICONS.forEach((icon) =>
      this._matIconRegistry.addSvgIcon(
        icon.name,
        this._sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      )
    );
  }

  setDefaultLang() {
    this._translateService.setDefaultLang('english');
    this._translateService.use('english');
  }
}
