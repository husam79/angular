import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { settings } from 'src/app/modules/settings/enums/settings.enum';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userData: any;
  public companyName = '';
  @Output('toggle') toggle = new EventEmitter<boolean>();
  constructor(
    private authService: AuthenticationService,
    private settingService: SettingsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.getUserData().subscribe((data: any) => {
      this.userData = data;
    });
    this.settingService.getProperty(settings.company_name).subscribe((data) => {
      this.companyName = data?.value;
    });
  }
  toggleSide() {
    this.toggle.next(true);
  }
  logout() {
    this.authService.logout().subscribe((data) => {
      this.router.navigate([`/${AppRoutes.Authentication}/${AppRoutes.Login}`]);
    });
  }
}
