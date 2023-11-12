import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userData: any;
  constructor(private authService: AuthenticationService) {}
  ngOnInit(): void {
    this.authService.getUserData().subscribe((data: any) => {
      this.userData = data;
    });
  }
}
