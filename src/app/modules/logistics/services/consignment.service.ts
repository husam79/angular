import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ConsignmentService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'logistics/consignments');
  }
  getConsignments() {
    return this.readEntities('');
  }
  getConsignment(id: string) {
    return this.readEntity('', id);
  }
  getCalculations() {
    return this.readEntities('calculation_methods/all');
  }
  addConsignment(form: any) {
    return this.createEntity('', form);
  }
  editConsignment(form: any) {
    return this.updateEntity('', form);
  }
  deleteConsignment(body: any) {
    return this.deleteEntity('', body);
  }
}
