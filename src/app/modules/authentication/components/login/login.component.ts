import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPasswordStatus: boolean = false;
  accessTranslation = AppRoutes.Authentication;
  constructor(
    public router: Router,
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {}

  initialForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initialForm();
  }
  login() {
    this._authenticationService.login(this.loginForm.value).subscribe((res) => {
      if (res.msg == 'Password change is required')
        this.router.navigate(['/authentication/change-password']);
      else this.router.navigate(['/accounting/transactions']);
    });
  }
}
