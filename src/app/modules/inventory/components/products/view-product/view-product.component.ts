import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  accessTranslation = AppTranslate.Products;
  product?: Product;
  data: any[] = [];
  constructor(
    protected route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      if (id) {
        this.productService.getProduct(id).subscribe((data) => {
          this.product = data;
          this.data = data.variants;
        });
      }
    });
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
