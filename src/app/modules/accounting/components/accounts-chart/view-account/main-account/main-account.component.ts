import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.scss'],
})
export class MainAccountComponent extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Chart;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'date',
        headerName: this.accessTranslation + '.date',
        cellRenderer: (params: any) => {
          return `<div>
          ${params}
          </div>`;
        },
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      onRowClicked: (e) => {
        const row = this.gridOptions.api?.getSelectedRows()[0];
        // this.router.navigate([`edit/${row.id}`], {
        //   relativeTo: this.activeRoute,
        // });
      },
    };
  }
}
