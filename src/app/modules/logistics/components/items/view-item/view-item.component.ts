import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { AppRoutes } from 'src/core/constant/routes';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent {
  item?: any;
  accessTranslation = AppTranslate.Items;
  constructor(
    protected route: ActivatedRoute,
    private itemService: ItemsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      if (id) {
        this.itemService.getItem(id).subscribe((data) => {
          this.item = data;
        });
      }
    });
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
