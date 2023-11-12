import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { debounceTime, switchMap, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TransactionDetailsInput } from './cell-renderers/input.cell';
import { DetailsActionsCell } from './cell-renderers/action.cell';
import { AccountService } from 'src/app/modules/accounting/services/account.service';
import { Account } from 'src/app/modules/accounting/interfaces/account.interface';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent
  extends AgTemplateComponent
  implements OnChanges
{
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  accessTranslation = AppTranslate.Transactions;
  fb = inject(FormBuilder);
  @Input('transactionForm') transactionForm!: FormGroup;
  @Input('currency') currency?: any;
  @Input('entries') entries?: any;
  @Input('id') id?: any;

  constructor(private accountService: AccountService) {
    super();
    this.columnDefs = [
      {
        field: 'acc_name',
        headerName: 'account',
        cellRenderer: TransactionDetailsInput,
        flex: 1.4,
      },
      {
        field: 'd',
        headerName: 'debit',
        cellRenderer: TransactionDetailsInput,
      },
      {
        field: 'c',
        headerName: 'credit',
        cellRenderer: TransactionDetailsInput,
      },
      {
        field: 'description',
        cellRenderer: TransactionDetailsInput,
        headerName: 'description',
      },
      {
        cellRenderer: DetailsActionsCell,
        field: 'action',
        headerName: '',
        width: 70,
        minWidth: 70,
        flex: 0.2,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      defaultColDef: {
        ...this.gridOptions.defaultColDef,
        resizable: false,
      },
      rowHeight: 50,
      context: { parent: this },
      tabToNextCell: (params) => {
        if (params.nextCellPosition) return params.nextCellPosition;
        else {
          if (
            params.previousCellPosition &&
            params.previousCellPosition.column.getColId() == 'action'
          ) {
            this.addDetails();

            return params.previousCellPosition;
          }

          return params.previousCellPosition;
        }
      },
      onCellFocused: (params) => {
        let nodes: any[] = [];
        if (!params.rowPinned) {
          params.api.forEachNode((node) => {
            if (node.rowIndex == params.rowIndex) {
              nodes = [node];
            }
          });
          params.api.refreshCells({
            columns: [
              params.column instanceof Column ? params.column?.getColId() : '',
            ],
            rowNodes: nodes,
            force: true,
          });
        }
      },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['transactionForm']?.currentValue) {
      changes['transactionForm'].currentValue
        .get('details')
        .valueChanges.pipe(
          debounceTime(500),
          switchMap((res) => {
            return of(res);
          })
        )
        .subscribe((res: any) => {
          this.calcTotals(
            changes['transactionForm'].currentValue.get('details').getRawValue()
          );
        });
    }

    if (
      changes &&
      changes['entries']?.currentValue &&
      changes['entries']?.currentValue?.length > 0
    ) {
      this.buildEntriesForm(changes['entries']?.currentValue);
    }
    if (changes && changes['id']?.currentValue) {
      this.columnDefs.pop();
      this.gridOptions?.api?.setColumnDefs(this.columnDefs);
      this.gridOptions.api?.refreshHeader();
    }
    if (changes && changes['currency']?.currentValue) {
      let currency = changes['currency']?.currentValue;
      console.log(currency);
    }
  }

  onGridReady(e: any) {
    this.gridOptions.api?.setRowData([]);
    this.setPinnedRow();
  }
  setPinnedRow() {
    this.gridOptions.api?.setPinnedBottomRowData([{ acc_no: 'Total', id: 0 }]);
  }

  buildEntriesForm(entries: any[]) {
    entries.forEach((entry) => {
      let id = self.crypto.randomUUID();
      entry['id'] = id;
      this.addDetails(entry, id);
    });
    this.gridOptions.api?.setRowData(entries);
  }
  buildFormDetail(entry?: any) {
    let group = this.fb.group({
      acc_no: this.fb.control({ value: null, disabled: entry }, []),
      d: this.fb.control({ value: null, disabled: entry }, []),
      c: this.fb.control({ value: null, disabled: entry }, []),
      description: this.fb.control(null, []),
      new: this.fb.control(true),
    }) as any;
    if (entry) {
      group.patchValue(entry);
    }
    return group;
  }

  get detailsForm() {
    return this.transactionForm.get('details') as FormGroup;
  }

  addDetails(entry?: any, id?: any) {
    if (!id) id = new Date().getTime();
    this.detailsForm.addControl(`${id}`, this.buildFormDetail(entry));
    if (!entry) this.gridOptions.api?.applyTransaction({ add: [{ id: id }] });
  }
  calcTotals(values: any) {
    console.log(this.transactionForm);
    let debit = 0;
    let credit = 0;
    for (let key in values) {
      debit += +values[key].d || 0;
      credit += +values[key].c || 0;
    }
    this.gridOptions.api?.setPinnedBottomRowData([
      { acc_no: 'Total', d: debit, c: credit },
    ]);
  }
  getChildAccount() {
    this.coreService.getAllAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
}
