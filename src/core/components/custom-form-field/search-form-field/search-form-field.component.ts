import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'search-form-field',
  templateUrl: './search-form-field.component.html',
  styleUrls: ['./search-form-field.component.scss'],
})
export class SearchFormFieldComponent implements OnInit {
  @ViewChild('searchInput') searchInput: any;
  @Input('control') control?: any;
  @Input('data') data?: any[];
  @Input('searchKey') searchKey: string = '';
  @Input('selectKey') selectKey: string = '';
  @Input('title') title: string = '';
  @Input('label') label: string = '';
  @Input('selectObject') selectObject = false;
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column' = 'd-flex-column-normal';
  @Output('dataChanged') dataChanged = new EventEmitter<any>();

  options: any[] = [];
  selectedOption?: any;
  required: boolean = false;
  myControl = new FormControl('');
  filteredOptions?: Observable<any[]>;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']?.currentValue) {
      this.options = changes['data']?.currentValue;
      if (this.selectedOption) {
        let check = this.options.find(
          (o) => o[this.selectKey] == this.selectedOption[this.selectKey]
        );
        if (!check) this.selectedOption = undefined;
      }
      this.myControl.reset();
    }
  }
  ngOnInit(): void {
    if (this.control) {
      this.required = this.control.hasValidator(Validators.required);
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    let filter = this.options.filter(
      (option) =>
        option[this.searchKey].toLowerCase().includes(filterValue) &&
        (this.selectedOption
          ? option[this.selectKey] !== this.selectedOption[this.selectKey]
          : true)
    );

    return filter;
  }
  catchData(event: any) {
    this.selectedOption = this.options.find(
      (option) => option[this.selectKey] == event.value
    );
    this.myControl.reset();
    if (!this.selectObject) this.dataChanged.next(event.value);
    else {
      this.dataChanged.next(this.selectedOption);
    }
  }
  open() {
    this.searchInput.nativeElement.focus();
  }
  checkData() {
    if (this.control.value) {
      this.selectedOption = this.options.find(
        (option) => option[this.selectKey] == this.control.value
      );
    }
  }
}
