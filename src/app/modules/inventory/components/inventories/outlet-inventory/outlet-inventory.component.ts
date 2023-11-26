import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-outlet-inventory',
  templateUrl: './outlet-inventory.component.html',
  styleUrls: ['./outlet-inventory.component.scss'],
})
export class OutletInventoryComponent {
  loginSvg: AnimationOptions = {
    path: '/assets/animations/welcome.json',
  };
}
