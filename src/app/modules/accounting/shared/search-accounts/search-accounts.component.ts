import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable, startWith, map, tap } from 'rxjs';
import { Account } from '../../interfaces/account.interface';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.scss'],
})
export class SearchAccountsComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  selectedOption?: Account;
  filteredOptions?: Observable<Account[]>;
  filterLength = 0;
  @ViewChild('searchInput') searchInput: any;
  @Input() control?: any;
  @Input() data?: any;
  options: Account[] = [
    {
      name: 'Assets',
      no: '1',
      balance: '0.00',
      is_main: 1,
      children: [],
    },
    {
      name: 'Second Account',
      no: '2',
      balance: '0.00',
      is_main: 1,
      children: [],
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['control']?.currentValue) {
    }
    if (changes && changes['data']?.currentValue) {
      console.log(changes['data']?.currentValue);
    }
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      tap((res) => {}),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Account[] {
    const filterValue = value.toLowerCase();

    let filter = this.options.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) &&
        option.name !== this.selectedOption?.name
    );
    this.filterLength = filter.length;
    return filter;
  }
  open() {
    this.searchInput.nativeElement.focus();
  }
  catchData(event: any) {
    this.selectedOption = event.value;
    this.myControl.reset();
  }
}
