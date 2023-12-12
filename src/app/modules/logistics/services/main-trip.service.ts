import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MainTripService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'logistics/main_trips');
  }
  addTrip(form: any) {
    return this.createEntity('', form);
  }
  updateTrip(body: any) {
    return this.updateEntity('', body);
  }
  getMainTrips() {
    return this.readEntities('');
  }
  getTrip(id: string) {
    return this.readEntity('', id);
  }
  deleteTrip(body: any) {
    return this.deleteEntity('', body);
  }
  payment(index: number, body: any) {
    if (index == 1) {
      return this.patchEntity('update-transportation', body);
    }
    if (index == 2) return this.patchEntity('update-uploading', body);

    return this.patchEntity('update-downloading', body);
  }
}
