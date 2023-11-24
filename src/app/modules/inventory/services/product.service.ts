import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
@Injectable({ providedIn: 'root' })
export class ProductService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory/products');
  }
  getProducts() {
    return this.readEntities('');
  }
  createProduct(form: any) {
    return this.createEntity('', form);
  }
  updateProduct(form: any) {
    return this.updateEntity('', form);
  }
  getProduct(id: string) {
    return this.readEntity('', id);
  }
}
