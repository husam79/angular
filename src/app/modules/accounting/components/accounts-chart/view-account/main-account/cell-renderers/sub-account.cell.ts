import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
@Component({
  selector: 'sub-account',
  template: `
    <a
      class="router-nav"
      [routerLink]=""
      [relativeTo]="route"
      [queryParams]="{ no: params.data?.no }"
      (click)="navigate()"
      >{{ params.data.name }}</a
    >
  `,
  styles: [
    `
      .router-nav {
        color: var(--primary-color);
        cursor: pointer;
      }
    `,
  ],
})
export class SubAccountCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2,
    public route: ActivatedRoute,
    private accountService: AccountService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  navigate() {
    this.accountService.activeAccount.next(this.params.data.no);
    this._router.navigate([`../${this.params.data.no}`], {
      relativeTo: this.route,
    });
  }
}
