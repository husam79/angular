import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userData: any;
  @Output('toggle') toggle = new EventEmitter<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.getUserData().subscribe((data: any) => {
      this.userData = data;
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
