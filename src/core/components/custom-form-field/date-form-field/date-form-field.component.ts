import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'date-form-field',
  templateUrl: './date-form-field.component.html',
  styleUrls: ['./date-form-field.component.scss'],
})
export class DateFormFieldComponent {
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
  @Input('placeholder') placeholder: string = '';
}
