import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'settings');
  }
  getProperty(name: string) {
    return this.readEntities(`name/${name}`);
  }
}
