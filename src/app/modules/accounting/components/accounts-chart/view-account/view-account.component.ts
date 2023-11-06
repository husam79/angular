import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, skip, tap } from 'rxjs';
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
