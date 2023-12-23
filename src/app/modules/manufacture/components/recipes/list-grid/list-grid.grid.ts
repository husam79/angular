import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ActivatedRoute } from '@angular/router';
import { RecipeActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'recipes-table-grid',
  template: '',
  providers: [],
})
export class RecipesGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Recipes;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    super();
    this.columnDefs = [
      { field: 'name', headerName: 'name' },
      {
        field: 'description',
        headerName: 'description',
      },
      {
        headerName: '',
        cellRenderer: RecipeActionsCell,
        width: 75,
        minWidth: 75,
        flex: 0.3,
        resizable: false,
      },
    ];
    this.gridOptions = {
      defaultColDef: { ...this.defaultOption, minWidth: 100 },
      ...this.gridOptions,
      pagination: false,
      context: { parent: this },
    };
  }

  setRowData(data: any[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
