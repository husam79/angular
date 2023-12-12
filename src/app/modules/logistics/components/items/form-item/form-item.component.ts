import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
})
export class FormItemComponent {
  accessTranslation = AppTranslate.Items;
  id: string = '';
  itemForm!: UntypedFormGroup;
  units = ['kg', 'g', 'pcs'];
  data: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService
  ) {
    this.itemForm = fb.group({
      id: fb.control(null),
      name_en: fb.control('', [Validators.required]),
      name_tr: fb.control('', [Validators.required]),
      hs_code: fb.control(' '),
      uom: fb.control('', [Validators.required]),
      price: fb.control(0),
      customs_cost: fb.control(0),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.itemService.getItem(id).subscribe((data) => {
          this.itemForm.patchValue(data);
        });
      }
    });
  }
  save() {
    if (this.itemForm.invalid) return;
    if (!this.id) {
      let value = this.itemForm.value;
      delete value['id'];
      this.itemService.addItem(value).subscribe((data) => {
        this.cancel();
      });
    } else {
      this.itemService
        .editItem({ ...this.itemForm.value, id: this.id })
        .subscribe((data) => {
          this.cancel();
        });
    }
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
