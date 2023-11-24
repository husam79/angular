import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
@Injectable({ providedIn: 'root' })
export class VariantService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory/variants');
  }
  deleteVariant(id: string) {
    return this.deleteEntity('', { id });
  }
}
