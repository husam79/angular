import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { debounceTime, switchMap, of } from 'rxjs';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { ColDef, Column } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TransactionDetailsInput } from './cell-renderers/input.cell';
import { DetailsActionsCell } from './cell-renderers/action.cell';
import { AccountService } from 'src/app/modules/accounting/services/account.service';

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
  accounts = [];
  accessTranslation = AppTranslate.Transactions;
  fb = inject(FormBuilder);
  @Input('transactionForm') transactionForm!: FormGroup;
  constructor(private accountService: AccountService) {
    super();
    this.columnDefs = [
      {
        field: 'account',
        headerName: 'account',
        cellRenderer: TransactionDetailsInput,
        flex: 1.4,
      },
      {
        field: 'debit',
        headerName: 'debit',
        cellRenderer: TransactionDetailsInput,
      },
      {
        field: 'credit',
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
    if (changes && changes['transactionForm'].currentValue) {
      changes['transactionForm'].currentValue
        .get('details')
        .valueChanges.pipe(
          debounceTime(500),
          switchMap((res) => {
            return of(res);
          })
        )
        .subscribe((res: any) => {
          this.calcTotals(res);
        });
    }
  }

  onGridReady(e: any) {
    this.addDetails();
    this.setPinnedRow();
    this.getChildAccount();
    // this.gridOptions.api?.setRowData(this.rowData);
  }
  setPinnedRow() {
    this.gridOptions.api?.setPinnedBottomRowData([{ account: 'Total', id: 0 }]);
  }

  buildFormArray() {
    // this.addDetails();
  }
  buildFormDetails() {
    return this.fb.group({
      account: this.fb.control(null, []),
      debit: this.fb.control(null, []),
      credit: this.fb.control(null, []),
      description: this.fb.control(null, []),
      new: this.fb.control(true),
    }) as any;
  }

  get detailsForm() {
    return this.transactionForm.get('details') as FormGroup;
  }

  addDetails() {
    let date = new Date().getTime();
    this.detailsForm.addControl(`${date}`, this.buildFormDetails());
    this.gridOptions.api?.applyTransaction({ add: [{ id: date }] });
  }
  calcTotals(values: any) {
    let debit = 0;
    let credit = 0;
    console.log(values);
    for (let key in values) {
      debit += +values[key].debit || 0;
      credit += +values[key].credit || 0;
    }
    this.gridOptions.api?.setPinnedBottomRowData([
      { account: 'Total', debit, credit },
    ]);
  }
  getChildAccount() {
    return this.accountService.children().subscribe((data) => {
      this.accounts = data;
    });
  }
}
