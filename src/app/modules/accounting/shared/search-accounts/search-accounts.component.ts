import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, tap, of } from 'rxjs';
import { Account } from '../../interfaces/account.interface';
import { CoreService } from 'src/core/services/core.service';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.scss'],
})
export class SearchAccountsComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  selectedOption?: Account;
  filteredOptions?: Observable<Account[]>;
  coreService = inject(CoreService);
  filterLength = 0;
  @ViewChild('searchInput') searchInput: any;
  @Input() control?: any;
  @Input('currency') currency?: any;
  @Input('width') width?: string;
  @Input('title') title?: any;
  options: Account[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['currency']?.currentValue) {
      this.options = this.coreService.accounts.filter(
        (option) => option.currency_id == changes['currency']?.currentValue?.id
      );
      this.myControl.setValue(null);
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
    console.log(this.selectedOption);
    const filterValue = value.toLowerCase();
    let options = this.coreService.accounts;
    if (this.options?.length > 0) {
      options = this.options;
    }
    let filter = options.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) &&
        option.no !== this.selectedOption?.no
    );
    let matched = filter.some((option) => option.no == this.selectedOption?.no);
    // if (matched && filter.length > 0) {
    //   this.selectedOption = undefined;
    // }
    return filter;
  }
  open() {
    this.searchInput.nativeElement.focus();
  }
  catchData(event: any) {
    let options = this.coreService.accounts;
    if (this.options.length > 0) options = this.options;
    this.selectedOption = options.find((option) => option.no == event.value);
    this.myControl.reset();
  }
}
