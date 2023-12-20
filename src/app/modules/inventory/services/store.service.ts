import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { of, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class StoreService extends CRUDService<Product> {
  stores: any[] = [];
  constructor(http: HttpClient) {
    super(http, 'inventory/stores');
  }
  getStore(id: number) {
    return this.readEntity('store', id);
  }
  getStores() {
    return this.readEntities('');
  }
  getAllStores() {
    if (this.stores.length) return of(this.stores);
    else
      return this.readEntities('').pipe(
        tap((data) => {
          this.stores = data;
        })
      );
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
