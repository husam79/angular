import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'select-form-field',
  templateUrl: './select-form-field.component.html',
  styleUrls: ['./select-form-field.component.scss'],
})
export class SelectFormFieldComponent {
  @Input('group') group?: FormGroup;
  @Input('name') name: string = '';
  @Input('key') key: string = '';
  @Input('value') value: string = '';
  @Input('label') label?: string;
  @Input('gridView') gridView: boolean = false;
  @Input('data') data: any[] = [];
  @Input('placeholder') placeholder: string = '';
  @Output('selectionChange') selectionChange = new EventEmitter();
  catchChange(event: any) {
    this.selectionChange.next(event);
  }
}
