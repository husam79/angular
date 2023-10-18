import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPasswordStatus: boolean = false;
  accessTranslation = AppRoutes.Authentication;
  constructor(public router: Router, private _fb: FormBuilder) {}

  initialForm() {
    this.loginForm = this._fb.group({
      email: [''],
      pwd: [''],
    });
  }

  ngOnInit(): void {
    this.initialForm();
  }
  login() {}
}
