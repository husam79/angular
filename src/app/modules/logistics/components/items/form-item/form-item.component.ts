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
      name_en: fb.control(null, [Validators.required]),
      name_tr: fb.control(null, [Validators.required]),
      hs_code: fb.control(null),
      uom: fb.control(null, [Validators.required]),
      price: fb.control(null),
      customs_cost: fb.control(null),
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
    if (!this.id)
      this.itemService.addItem(this.itemForm.value).subscribe((data) => {
        this.cancel();
      });
    else {
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
