import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'date-form-field',
  templateUrl: './date-form-field.component.html',
  styleUrls: ['./date-form-field.component.scss'],
})
export class DateFormFieldComponent implements OnInit {
  @Input('group') group?: FormGroup;
  @Input('name') name: string = '';
  @Input('label') label?: string;
  @Input('gridView') gridView?: boolean = false;
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column'
    | '' = '';
  required: boolean = false;
  @Input('placeholder') placeholder: string = '';
  ngOnInit(): void {
    let control = this.group?.get(this.name);
    if (control) {
      this.required = control.hasValidator(Validators.required);
    }
  }
}
