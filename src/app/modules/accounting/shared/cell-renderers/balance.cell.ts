import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
  inject,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'balance-cell',
  template: `
    <div>
      {{ params.data?.balance | number : '3.1-3' }}
      {{ params.data?.currency_id }}
    </div>
  `,
  styles: [``],
})
export class BalanceCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  pinned: boolean = false;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  accountControl: any;
  parent: any;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
