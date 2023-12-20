import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
import { InvoiceService } from '../../../services/invoice.service';
import { AppTranslate } from 'src/core/constant/translation';
import { VariantService } from '../../../services/variant.service';
import { switchMap } from 'rxjs';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  isPurchase: boolean = false;
  id?: string = '';
  data?: any;
  accessTranslation = AppTranslate.Invoices;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private variantService: VariantService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isPurchase = this.router.url.includes(AppRoutes.PurchaseInvoices);

    if (this.id) {
      this.variantService
        .getAllVariants()
        .pipe(
          switchMap((arr) => {
            let variants: any = {};
            arr.forEach((a: any) => {
              variants[a.variant_id] = {
                name: a.product_name + '-' + a.variant_name,
                uom: a.uom,
              };
            });
            if (this.isPurchase) {
              return this.invoiceService.getPurchase(this.id!, variants);
            } else {
              return this.invoiceService.getSale(this.id!, variants);
            }
          })
        )
        .subscribe((data) => {
          this.storeService.getAllStores().subscribe((stores) => {
            data['store'] = stores.find(
              (store: any) => store.id == data.entries[0]?.store_id
            )?.name;
            this.data = data;
          });
        });
    }
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  edit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
