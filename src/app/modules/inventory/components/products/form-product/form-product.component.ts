import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppRoutes } from 'src/core/constant/routes';
import { ProductKinds } from '../../../enums/product-kind.enum';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent {
  id: string = '';
  accessTranslation = AppRoutes.Products;
  products = ProductKinds;
  productForm!: UntypedFormGroup;
  constructor(private fb: FormBuilder) {
    this.productForm = fb.group({
      name: fb.control(null, [Validators.required]),
      brand: fb.control(null),
      kind: fb.control(null, [Validators.required]),
      tax: fb.control(null, [Validators.required]),
      ar_description: fb.control(null),
      de_description: fb.control(null),
      en_description: fb.control(null),
    });
  }
  save() {}
  cancel() {}
}
