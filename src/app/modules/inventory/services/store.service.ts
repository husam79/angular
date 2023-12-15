import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
@Injectable({ providedIn: 'root' })
export class StoreService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory/stores');
  }
  getStore(id: number) {
    return this.readEntity('store', id);
  }
  getStores() {
    return this.readEntities('');
  }
  getStoreProducts(id: string) {
    return this.readEntity('', id);
  }
  addStore(data: any) {
    return this.createEntity('', data);
  }
  editStore(data: any) {
    return this.updateEntity('', data);
  }
  deleteStore(body: any) {
    return this.deleteEntity('', body);
  }
}
