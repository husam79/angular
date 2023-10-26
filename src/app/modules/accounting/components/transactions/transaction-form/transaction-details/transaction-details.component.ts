import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ColDef, Column } from 'ag-grid-community';
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
  public rowData: any[] = [];
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
        //  console.log(params.api.copyToClipboard);
        let nodes: any[] = [];
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
      },
    };
  }
  onGridReady(e: any) {
    this.addDetails();
    // this.gridOptions.api?.setRowData(this.rowData);
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
}
