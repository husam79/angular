import { Component } from '@angular/core';
import { ProductsGrid } from './list-grid/list-grid.grid';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsListComponent extends ProductsGrid {
  constructor(private productService: ProductService) {
    super();
  }
  onGridReady(e: any) {
    this.productService.getProducts().subscribe((data) => {
      this.setRowData(data);
    });
  }
}
