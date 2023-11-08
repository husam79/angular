import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { IUser } from '../interfaces/authentication.interface';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends CRUDService<IUser> {
  email: string = '';
  constructor(http: HttpClient) {
    super(http, 'users');
  }
  login(formData: IUser) {
    return this.createEntity('login', formData).pipe(
      tap((res) => {
        this.email = formData.email;
      })
    );
  }
  changePassword(formData: any) {
    return this.createEntity('change-password', {
      ...formData,
      email: this.email,
    });
  }
}
