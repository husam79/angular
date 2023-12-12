import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { map } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class InvoiceService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory/invoices');
  }
  getPurchases() {
    return this.readEntities('purchase');
  }
  getPurchase(id: string, variants: any = {}) {
    return this.readEntity('purchase', id).pipe(
      map((data) => {
        return this.calcTotal(data, variants);
      })
    );
  }
  getSale(id: string, variants: any = {}) {
    return this.readEntity('sell', id).pipe(
      map((data) => {
        return this.calcTotal(data, variants);
      })
    );
  }
  transferPurchase(data: any) {
    return this.createEntity('purchase/transfer', data);
  }
  transferSale(data: any) {
    return this.createEntity('sell/transfer', data);
  }
  getSales() {
    return this.readEntities('sell');
  }

  addPurchase(data: any) {
    return this.createEntity('purchase', data);
  }
  addSale(data: any) {
    return this.createEntity('sell', data);
  }
  editPurchase(data: any) {
    return this.updateEntity('purchase', data);
  }
  editSale(data: any) {
    return this.updateEntity('sell', data);
  }
  calcTotal(data: any, variants: any = {}) {
    data.entries.forEach((entry: any) => {
      entry['variant_name'] = variants[entry['variant_id']]?.name;
      entry['uom'] = variants[entry['variant_id']]?.uom;
      let unit_price = 0 || entry['unit_price'];
      let quantity = 0 || entry['quantity'];
      let tax = +(0 || entry['tax']);

      let total = unit_price * quantity * (1 + tax / 100);
      if (!isNaN(total)) {
        entry['total'] = total.toFixed(2);
      }
    });
    return data;
  }
  deletePurchase(data: any) {
    return this.deleteEntity('purchase', data);
  }
  deleteSale(data: any) {
    return this.deleteEntity('sell', data);
  }
}
