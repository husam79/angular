import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { AppTranslate } from 'src/core/constant/translation';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss'],
})
export class ViewAccountComponent implements OnInit {
  accessTranslation = AppTranslate.Chart;
  accountDetails: any;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) this.accountService.activeAccount.next(params['id']);
    });
  }
  getQueryParams = () => {
    return this.route.queryParams.pipe(map((data) => data['parent']));
  };
  getAccountDetails = () => {
    return this.route.parent?.params.pipe(
      map((data) => data['id']),
      switchMap((data) => {
        return combineLatest([this.route.queryParams, of(data)]);
      })
    );
  };
  getDetails = (res: any) => {
    if (res[0]?.parent == '1') {
      return this.accountService.getAccount(res[1]).pipe(
        tap((data) => {
          this.accountDetails = data;
        }),
        catchError(() => {
          return of([]);
        })
      );
    } else {
      return this.accountService.getLeafAccount(res[1]).pipe(
        tap((data) => {
          this.accountDetails = {
            name: data.acc_name,
            entries: data.entries,
            balance: data.entries?.length
              ? data.entries[data.entries.length - 1].debit
                ? -data.entries[data.entries.length - 1].debit
                : data.entries[data.entries.length - 1].credit
              : 0,
            no: data.acc_no,
            is_main: +res[0]?.parent,
            currency_id: data.currency,
          };
        })
      );
    }
  };
  edit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
