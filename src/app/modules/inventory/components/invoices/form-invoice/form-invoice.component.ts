import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/modules/accounting/services/currency.service';
import { AppRoutes } from 'src/core/constant/routes';
import { AppTranslate } from 'src/core/constant/translation';
import { StoreService } from '../../../services/store.service';
import { Currency } from 'src/core/interfaces/currency.interface';
import { InvoiceService } from '../../../services/invoice.service';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-form-invoice',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.scss'],
})
export class FormInvoiceComponent implements OnInit {
  accessTranslation = AppTranslate.Invoices;
  invoiceForm!: UntypedFormGroup;
  invoice: any;
  stores: any[] = [];
  entries: any[] = [];
  variants: any[] = [];
  id: string = '';
  isPurchase: boolean = false;
  mainCurrency?: Currency;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public currencyService: CurrencyService,
    private storeService: StoreService,
    private invoiceService: InvoiceService,
    private inventoryService: InventoryService
  ) {
    this.invoiceForm = fb.group({
      account_id: fb.control(null, [Validators.required]),
      currency_id: fb.control(''),
      date: fb.control(null, [Validators.required]),
      invoice_no: fb.control(''),
      store_id: fb.control(''),
      conversion_factor: fb.control('', [Validators.required]),
      notes: fb.control(''),
      delivery_time: fb.control(null),
      supplier_id: fb.control(''),
      entries: fb.group({}),
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isPurchase = this.router.url.includes(AppRoutes.PurchaseInvoices);
    this.currencyService.getCurrencies().subscribe();
    this.storeService.getStores().subscribe((data) => {
      this.stores = data;
    });

    if (this.id) {
      if (this.isPurchase) {
        this.invoiceService.getPurchase(this.id).subscribe((data) => {
          this.handleData(data);
        });
      } else {
        this.invoiceService.getSale(this.id).subscribe((data) => {
          this.handleData(data);
        });
      }
    }
  }
  get account() {
    return this.invoiceForm.get('account_id') as FormControl;
  }
  handleData(data: any) {
    this.invoiceForm.patchValue(data);
    this.invoiceForm.get('store_id')?.patchValue(data.entries[0]?.store_id);
    this.entries = data.entries;
    this.invoice = data;
    this.inventoryService.getAllVariants().subscribe((data) => {
      this.variants = data;
    });
  }
  updateCurrency(e: any) {
    this.invoiceForm.get('currency_id')?.setValue(e.currency_id);
    this.mainCurrency = this.currencyService.currencies?.find((currency) => {
      return e.currency_id == currency.id;
    });
    this.invoiceForm
      .get('conversion_factor')
      ?.setValue(this.mainCurrency?.rateToMainCurrency);
  }
  save() {
    if (this.invoiceForm.invalid) return;
    let invoice = this.invoiceForm.getRawValue();

    let variants: any[] = [];

    Object.keys(invoice.entries).forEach((entry) => {
      if (!invoice.entries[entry]['id']) {
        delete invoice.entries[entry]['id'];
      }
      variants.push({
        ...invoice.entries[entry],
        tax: this.inventoryService.vat ? invoice.entries[entry].tax : 0,
        store_id: invoice.store_id || this.invoice.entries[0]?.store_id,
      });
    });
    invoice.entries = variants;
    if (this.id) {
      if (this.isPurchase) {
        this.invoiceService
          .editPurchase({ ...invoice, id: this.id })
          .subscribe((data) => {
            this.cancel();
          });
      } else {
        this.invoiceService
          .editSale({ ...invoice, id: this.id })
          .subscribe((data) => {
            this.cancel();
          });
      }
    } else {
      if (this.isPurchase) {
        this.invoiceService.addPurchase(invoice).subscribe((data) => {
          this.cancel();
        });
      } else {
        this.invoiceService.addSale(invoice).subscribe((data) => {
          this.cancel();
        });
      }
    }
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
