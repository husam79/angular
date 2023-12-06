import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ItemsService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'logistics/items');
  }

  getItems() {
    return this.readEntities('');
  }
  getItem(id: string) {
    return this.readEntity('', id);
  }
  addItem(form: any) {
    return this.createEntity('', form);
  }
  editItem(form: any) {
    return this.updateEntity('', form);
  }
  deleteItem(body: any) {
    return this.deleteEntity('', body);
  }
}
