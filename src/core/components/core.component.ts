import { Component, OnInit, inject } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-core',
  template: ``,
  styleUrls: [],
})
export class CoreComponent {
  currencies: any[] = [];
  coreService: CoreService = inject(CoreService);
  constructor() {}
}
