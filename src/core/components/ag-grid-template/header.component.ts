import { IHeaderParams } from 'ag-grid-community';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'ag-header-comp',
  template: ` <div class="header">
    {{ headerName }}
    <span class="sign-req" *ngIf="params?.required">*</span>
  </div>`,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
      }
      .sign-req {
        color: red;
        font-size: 32px !important;
      }
    `,
  ],
})
export class HeaderRenderer implements IHeaderAngularComp {
  params?: IHeaderParams & { required?: boolean };
  headerName: string = '';
  agInit(params: IHeaderParams<any, any> & { required?: boolean }): void {
    this.params = params;
    this.headerName = params.displayName;
  }

  refresh(params: IHeaderParams<any, any> & { required?: boolean }): boolean {
    this.params = params;
    return true;
  }
}
