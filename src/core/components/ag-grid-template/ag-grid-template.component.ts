import { Subscription, Subject } from 'rxjs';
import { Component, OnDestroy, inject, Injector } from '@angular/core';
import { ColDef, GetRowIdParams, GridOptions } from 'ag-grid-community';
import { TranslateService } from '@ngx-translate/core';
import { TranslateComponent } from '../translate/translate.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/core/constant/routes';
@Component({
  selector: 'app-ag-template',
  template: ``,
  styles: [''],
})
//extends TranslateComponent
export class AgTemplateComponent implements OnDestroy {
  public gridOptions!: GridOptions;
  private languageSub?: Subscription;
  public defaultOption!: ColDef;
  public translateService = inject(TranslateService);
  protected activeRoute: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);
  protected appRouter = AppRoutes;
  constructor() {
    //super();
    this.defaultOption = {
      resizable: true,
      wrapText: false,
      suppressMovable: true,
      unSortIcon: true,
      wrapHeaderText: false,
      autoHeaderHeight: true,
      minWidth: 150,
      flex: 1,
      sortable: false,
      filter: false,
    };

    this.gridOptions = {
      // suppressCellFocus: true,
      animateRows: true,
      //  copyHeadersToClipboard: true,
      enableCellTextSelection: true,
      rowHeight: 45,

      rowStyle: {
        'margin-top': '3px',
        border: '1px solid var(--border-color)',
        'border-radius': '2px',
        color: 'var(--text-color)',
      },
      defaultColDef: {
        ...this.defaultOption,
        headerValueGetter: this.localizeHeader.bind(this),
      },
      getRowId: (params: GetRowIdParams) => {
        return params.data.id;
      },
    };
    this.languageSub = this.translateService.onLangChange.subscribe((event) => {
      this.gridOptions?.api?.refreshHeader();
    });
  }

  protected localizeHeader(parameters: any): string {
    let accessTranslation = parameters.context?.parent?.accessTranslation;
    let headerIdentifier = parameters?.colDef?.headerName;
    if (accessTranslation)
      headerIdentifier = accessTranslation + '.' + headerIdentifier;
    if (parameters?.colDef?.headerName)
      return this.translateService.instant(headerIdentifier);

    return '';
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }
}
