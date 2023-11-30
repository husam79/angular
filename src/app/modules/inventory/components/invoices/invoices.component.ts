import { Component } from '@angular/core';
import { InvoiceGrid } from './list-grid/list-grid.grid';
import { InvoiceService } from '../../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent extends InvoiceGrid {

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {
    super();
  }
  onGridReady(e: any) {

    if (this.isPurchase)
      this.invoiceService.getPurchases().subscribe((data) => {
        this.setRowData(data);
      });
    else {
      this.invoiceService.getSales().subscribe((data) => {
        this.setRowData(data);
      });
    }
  }
}
