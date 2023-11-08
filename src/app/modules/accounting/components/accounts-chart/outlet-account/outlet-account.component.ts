import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-outlet-account',
  templateUrl: './outlet-account.component.html',
  styleUrls: ['./outlet-account.component.scss'],
})
export class OutletAccountComponent {
  loginSvg: AnimationOptions = {
    path: '/assets/animations/welcome.json',
  };
}
