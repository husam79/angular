import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
@Injectable({ providedIn: 'root' })
export class StoreService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory/stores');
  }
  getStores() {
    return this.readEntities('');
  }
  getStoreProducts(id: string) {
    return this.readEntity('', id);
  }
}
