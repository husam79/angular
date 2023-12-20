import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, tap } from 'rxjs';

@Component({
  selector: 'app-search-variants',
  templateUrl: './search-variants.component.html',
  styleUrls: ['./search-variants.component.scss'],
})
export class SearchVariantsComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  selectedOption?: any;
  filteredOptions?: Observable<any[]>;

  filterLength = 0;
  @ViewChild('searchInput') searchInput: any;
  @Input() control?: any;
  @Input('store') store?: any;
  @Input('width') width?: string;
  @Input('title') title?: any;
  @Input('class') class?: any;
  @Input('external') external: boolean = false;
  @Input('data') data?: any[];
  @Input('product') product: boolean = false;
  @Input('gridView') gridView: boolean = false;
  @Input('focus') focus?: boolean;

  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column' = 'd-flex-column-normal';
  @Input('selectObject') selectObject = false;
  @Output('dataChanged') dataChanged = new EventEmitter<any>();
  @ViewChild('select') select: any;
  options: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      (changes['focus']?.currentValue === true ||
        changes['focus']?.currentValue === false)
    ) {
      this.select?.focus();
    }
    if (changes && changes['data']?.currentValue) {
      this.options = changes['data']?.currentValue;
      let check = this.options.find(
        (o) => o.variant_id == this.selectedOption?.variant_id
      );
      if (!check) this.selectedOption = undefined;
      this.myControl.reset();
    }
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      tap((res) => {}),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    let filter = this.options.filter((option) => {
      let fullName: string = option.product_name + '-' + option.variant_name;

      return (
        (option.variant_name.toLowerCase().includes(filterValue) ||
          (this.product && fullName.toLowerCase().includes(filterValue))) &&
        option.variant_id !== this.selectedOption?.variant_id
      );
    });

    return filter;
  }
  open() {
    this.searchInput.nativeElement.focus();
  }
  catchData(event: any) {
    this.selectedOption = this.options.find(
      (option) => option.variant_id == event.value
    );

    this.myControl.reset();
    if (!this.selectObject) this.dataChanged.next(event.value);
    else {
      this.dataChanged.next(this.selectedOption);
    }
  }
  checkData() {
    if (this.control.value) {
      this.selectedOption = this.options.find(
        (option) => option.variant_id == this.control.value
      );
    }
  }
}
