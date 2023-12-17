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
import { FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map, tap } from 'rxjs';
import { Account } from '../../interfaces/account.interface';
import { CoreService } from 'src/core/services/core.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.scss'],
})
export class SearchAccountsComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  selectedOption?: any;
  filteredOptions?: Observable<Account[]>;
  coreService = inject(CoreService);
  accountService = inject(AccountService);
  filterLength = 0;
  @ViewChild('searchInput') searchInput: any;
  @Input() control?: any;
  @Input('currency') currency?: any;
  @Input('width') width?: string;
  @Input('title') title?: any;
  @Input('class') class?: any;
  @Input('parent') parent: boolean = false;
  @Input('external') external: boolean = false;
  @Input('data') data?: Account[];
  @Input('focus') focus?: boolean;
  @Input('gridView') gridView: boolean = false;
  @Input('flexView') flexView?:
    | 'd-flex-normal'
    | 'd-flex-column-normal'
    | 'd-flex'
    | 'd-flex-column' = 'd-flex-column-normal';
  @Input('selectObject') selectObject = false;
  @ViewChild('select') select: any;
  @Output('dataChanged') dataChanged = new EventEmitter<any>();
  options: Account[] = [];
  required: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['currency']?.currentValue) {
      this.options = this.coreService.accounts.filter(
        (option) => option.currency_id == changes['currency']?.currentValue?.id
      );
      this.myControl.setValue(null);
      this.selectedOption = undefined;
    }
    if (changes && changes['parent']?.currentValue) {
      this.accountService.getParents().subscribe((data) => {
        this.options = data;
        this.myControl.reset();
      });
    }
    if (
      changes &&
      (changes['focus']?.currentValue === true ||
        changes['focus']?.currentValue === false)
    ) {
      this.select?.focus();
    }
    if (changes && changes['currency']?.currentValue) {
      if (this.data && this.data.length > 0) {
        this.options = this.data.filter(
          (d) => d.currency_id == changes['currency']?.currentValue
        );
      }
    } else if (changes && changes['data']?.currentValue) {
      if (!this.currency) this.options = changes['data']?.currentValue;
      else {
        this.options = changes['data']?.currentValue.filter(
          (d: any) => d.currency_id == this.currency.id
        );
      }
    }
  }
  ngOnInit() {
    if (this.control) {
      this.required = this.control.hasValidator(Validators.required);
    }

    if (!this.currency && !this.parent && !this.external) {
      this.coreService.getAllAccounts().subscribe((data) => {
        this.myControl.reset();
      });
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      tap((res) => {}),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Account[] {
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
    // let matched = filter.some((option) => option.no == this.selectedOption?.no);
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
    if (!this.selectObject) this.dataChanged.next(event.value);
    else {
      this.dataChanged.next(this.selectedOption);
    }
  }
  checkData() {
    if (this.options?.length == 0) {
      this.options = this.coreService.accounts;
      this.myControl.reset();
    }
    if (this.control.value) {
      this.selectedOption = this.options.find(
        (option) => option.no == this.control.value
      );
      this.myControl.reset();
    }
  }
}
