import { AfterViewInit, Component, Renderer2 } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private _translateService: TranslateService,
    private _matIconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.setDefaultLang();
    this.loadIcons();
  }
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
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
