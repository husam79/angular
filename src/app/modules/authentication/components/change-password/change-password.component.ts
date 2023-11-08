import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassForm!: FormGroup;
  showPasswordStatus: boolean = false;
  hide1 = false;
  hide2 = false;
  accessTranslation = AppRoutes.Authentication;
  constructor(
    public router: Router,
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  initialForm() {
    this.changePassForm = this._fb.group(
      {
        pwd: ['', [Validators.required]],
        email: [],
        confirm_password: [''],
      },
      {
        validator: this.checkPassword(),
      } as AbstractControlOptions
    );
  }

  ngOnInit(): void {
    this.initialForm();
  }
  changePassword() {
    this._authenticationService
      .login(this.changePassForm.value)
      .subscribe((res) => {
        this.router.navigate(['']);
      });
  }
  checkPassword() {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls['pwd'];
      let confirmPassword = formGroup.controls['confirm_password'];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ required: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }
  save() {
    if (this.changePassForm.invalid) return;
    this._authenticationService
      .changePassword(this.changePassForm.value)
      .subscribe((data) => {
        this.router.navigate(['/authentication/login']);
      });
  }
}
