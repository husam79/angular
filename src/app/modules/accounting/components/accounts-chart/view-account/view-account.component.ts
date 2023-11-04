import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
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
    private accountService: AccountService
  ) {}
  ngOnInit(): void {}
  getAccountDetails = () => {
    return this.route.parent?.params.pipe(map((data) => data['id']));
  };
  getDetails = (res: any) => {
    return this.accountService.getAccount(res).pipe(
      tap((data) => {
        this.accountDetails = data;
      })
    );
  };
}
