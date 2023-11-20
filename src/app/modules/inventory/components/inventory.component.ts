import { Component } from '@angular/core';
import { TranslateComponent } from 'src/core/components/translate/translate.component';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent extends TranslateComponent {
  constructor(private coreService: CoreService) {
    super();
  }
}
