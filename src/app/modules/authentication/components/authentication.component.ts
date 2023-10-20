import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { TranslateComponent } from 'src/core/components/translate/translate.component';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent extends TranslateComponent {
  loginSvg: AnimationOptions = {
    path: '/assets/animations/welcome.json',
  };
}
