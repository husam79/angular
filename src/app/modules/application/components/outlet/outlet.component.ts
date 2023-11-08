import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent {
  loginSvg: AnimationOptions = {
    path: '/assets/animations/welcome.json',
  };
}
