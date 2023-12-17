import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-form-field',
  templateUrl: './input-form-field.component.html',
  styleUrls: ['./input-form-field.component.scss'],
})
export class InputFormFieldComponent implements OnInit, OnChanges {
  @Input('group') group?: any;
  @Input('name') name: string = '';
  @Input('label') label?: string;
  @Input('focus') focus?: boolean;
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
  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;
  required: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      (changes['focus']?.currentValue === true ||
        changes['focus']?.currentValue === false)
    ) {
      this.inputRef?.nativeElement.focus();
    }
  }
  ngOnInit(): void {
    let control = this.group?.get(this.name) as FormControl;
    if (control) {
      this.required = control.hasValidator(Validators.required);
    }
  }
  onBlur(event: any) {
    this.blur.next(event);
  }
}
