import { Component, Input } from '@angular/core';
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
}
