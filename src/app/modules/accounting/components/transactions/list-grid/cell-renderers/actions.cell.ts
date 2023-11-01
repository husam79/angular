import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'transactions-list-actions',
  template: `
    <div class="d-flex-ng">
      <button mat-icon-button [matMenuTriggerFor]="menu" class="more-btn">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu" class="more-actions-menu">
        <button class="more-btn" color="primary" mat-menu-item>
          <mat-icon>remove_red_eye</mat-icon>
          <div>view</div>
        </button>
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          [routerLink]="['edit/' + params.data.id]"
          [relativeTo]="activeRoute"
        >
          <mat-icon>edit</mat-icon>
          <div>edit</div>
        </button>
        <button class="more-btn" color="primary" mat-menu-item>
          <mat-icon>delete</mat-icon>
          <div>delete</div>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      ::ng-deep {
        [dir='rtl'] .mat-mdc-menu-item {
          flex-direction: row-reverse !important;
        }
        .mat-mdc-menu-item {
          min-height: 40px !important;
          font-size: 14px !important;
          border-bottom: 1px dashed var(--light-active-accent-color) !important;
          &:last-child {
            border-bottom: none !important;
          }
        }
        .mat-mdc-menu-item.mdc-list-item {
          .mat-icon path {
            fill: var(--primary-color) !important;
          }
        }
        .mat-mdc-menu-content {
          padding: 0 !important;
        }
        .more-actions-menu {
          width: 100% !important;
        }
      }
      .more-btn {
        cursor: pointer;
        /* width: 100%;
        height: 30px;
        padding: 3px;
        padding-top: 4px;
        .mat-icon {
          scale: 0.7;
        } */
      }
    `,
  ],
})
export class TransactionActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  constructor(@Inject(INJECTOR) injector: Injector, private _router: Router) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
