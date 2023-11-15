import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-form-field',
  templateUrl: './input-form-field.component.html',
  styleUrls: ['./input-form-field.component.scss'],
})
export class InputFormFieldComponent {
  @Input('group') group?: FormGroup;
  @Input('name') name: string = '';
  @Input('label') label?: string;
  @Input('placeholder') placeholder: string = '';
  @Input('gridView') gridView: boolean = false;
  @Input('onlyNumbers') onlyNumbers: boolean = false;
  @Input('suffix') suffix?: string = '';
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column'
    | '' = '';
  @Output('blur') blur = new EventEmitter();

  onBlur(event: any) {
    this.blur.next(event);
  }
}
