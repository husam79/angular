import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
@Component({
  selector: 'select-form-field',
  templateUrl: './select-form-field.component.html',
  styleUrls: ['./select-form-field.component.scss'],
})
export class SelectFormFieldComponent implements OnInit, OnChanges {
  @Input('group') group?: any;
  @Input('name') name: string = '';
  @Input('key') key: string = '';
  @Input('value') value: string = '';
  @Input('label') label?: string;
  @Input('gridView') gridView: boolean = false;
  @Input('focus') focus?: boolean;
  @Input('data') data: any[] = [];
  @Input('placeholder') placeholder: string = '';
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column'
    | '' = '';
  @Output('selectionChange') selectionChange = new EventEmitter();
  required: boolean = false;
  @ViewChild('select') select?: any;
  @ContentChild(TemplateRef) optionTemplate!: TemplateRef<any>;
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      (changes['focus']?.currentValue === true ||
        changes['focus']?.currentValue === false)
    ) {
      this.select.focus();
    }
  }
  ngOnInit(): void {
    let control = this.group?.get(this.name);
    this.required = control?.hasValidator(Validators.required);
  }
  catchChange(event: any) {
    this.selectionChange.next(event);
  }
  selectChange(e: any) {
    this.selectionChange.next(e.value);
  }
}
