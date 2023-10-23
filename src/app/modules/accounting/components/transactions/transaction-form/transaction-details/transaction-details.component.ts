import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { TransactionDetailsInput } from './cell-renderers/input.cell';
import { DetailsActionsCell } from './cell-renderers/action.cell';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent extends AgTemplateComponent {
  public rowData: any[] = [{ id: '1' }];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Transactions;
  fb = inject(FormBuilder);
  @Input('transactionForm') transactionForm!: FormGroup;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'account',
        headerName: 'account',
        cellRenderer: TransactionDetailsInput,
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
        width: 80,
        minWidth: 80,
        flex: 0.2,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      context: { parent: this },
      tabToNextCell: (params) => {
        console.log(params.previousCellPosition.column);
        if (params.nextCellPosition) return params.nextCellPosition;
        else {
          if (
            params.previousCellPosition &&
            params.previousCellPosition.column.getColId() == 'action'
          ) {
            this.detailsForm.addControl('2', this.buildFormDetails());
            this.gridOptions.api?.applyTransaction({ add: [{ id: '2' }] });

            return params.previousCellPosition;
          }

          return params.previousCellPosition;
        }
      },
    };
  }
  onGridReady(e: any) {
    this.buildFormArray();
    this.gridOptions.api?.setRowData(this.rowData);
  }

  buildFormArray() {
    let columns = this.gridOptions?.columnApi?.getColumns() || [];
    let details = <UntypedFormGroup>this.transactionForm.get('details');
    const formGroup: UntypedFormGroup = this.fb.group({});
    details.addControl('1', this.buildFormDetails());
  }
  buildFormDetails() {
    return this.fb.group({
      account: this.fb.control(null, []),
      debit: this.fb.control(null, []),
      credit: this.fb.control(null, []),
      description: this.fb.control(null, []),
    }) as any;
  }
  get detailsForm() {
    return this.transactionForm.get('details') as FormGroup;
  }

  addDetails() {
    this.detailsForm.addControl('2', this.buildFormDetails());
    this.gridOptions.api?.applyTransaction({ add: [{ id: '2' }] });
  }
}
