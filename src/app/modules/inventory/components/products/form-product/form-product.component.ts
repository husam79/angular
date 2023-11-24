import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppRoutes } from 'src/core/constant/routes';
import { ProductKinds } from '../../../enums/product-kind.enum';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  id: string = '';
  accessTranslation = AppRoutes.Products;
  products = ProductKinds;
  productForm!: UntypedFormGroup;
  data: any[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = fb.group({
      id: fb.control(null),
      name: fb.control(null, [Validators.required]),
      brand: fb.control(null),
      kind: fb.control(null, [Validators.required]),
      tax: fb.control(null, [Validators.required]),
      ar_description: fb.control(null),
      de_description: fb.control(null),
      en_description: fb.control(null),
      variants: fb.group({}),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.productService.getProduct(id).subscribe((data) => {
          this.productForm.patchValue(data);
          this.data = data.variants;
        });
      }
    });
  }
  save() {
    if (this.productForm.invalid) return;
    let data = this.productForm.value;
    let variants = [];
    for (let variant in data.variants) {
      let v = {
        ...data.variants[variant],
        acc_no:
          typeof data.variants[variant].acc_no == 'object'
            ? data.variants[variant].acc_no?.no
            : data.variants[variant].acc_no,
      };
      if (v.new) delete v['id'];
      variants.push(v);
    }
    data.variants = variants;
    if (!this.id)
      this.productService.createProduct(data).subscribe((data) => {
        this.cancel();
      });
    else {
      this.productService.updateProduct(data).subscribe((data) => {
        this.cancel();
      });
    }
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
