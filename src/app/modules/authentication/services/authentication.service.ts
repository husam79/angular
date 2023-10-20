import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { IUser } from '../interfaces/authentication.interface';
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends CRUDService<IUser> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
  login(formData: IUser) {
    return this.createEntity('login', formData);
  }
}
