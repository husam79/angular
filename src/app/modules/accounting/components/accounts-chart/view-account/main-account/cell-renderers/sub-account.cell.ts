import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
@Component({
  selector: 'sub-account',
  template: ` <a class="router-nav">{{ params.data.name }}</a> `,
  styles: [],
})
export class SubAccountCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
