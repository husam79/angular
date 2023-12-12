import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { of, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class VariantService extends CRUDService<Product> {
  variants: any[] = [];
  constructor(http: HttpClient) {
    super(http, 'inventory/variants');
  }
  getAllVariants() {
    if (this.variants.length) {
      return of(this.variants);
    } else
      return this.readEntities('').pipe(
        tap((data) => {
          this.variants = data;
        })
      );
  }
  deleteVariant(id: string) {
    return this.deleteEntity('', { id });
  }
  getVariants(inventory_id: string) {
    return this.readEntity('inventory-variants', inventory_id);
  }
}
