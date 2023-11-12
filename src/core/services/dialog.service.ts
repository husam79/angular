import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  size = {
    ms: { width: '36vw', height: '32vh' },
    s: { width: '36vw', height: '42vh' },
    m: { width: '30vw', height: '60vh' },
    l: { width: '50vw', height: '90vh' },
    xl: { width: '90vw', height: '90vh' },
  };

  constructor(private dialog: MatDialog) {}

  openDialog(
    component: ComponentType<any> | TemplateRef<any>,
    options: {
      width?: string;
      height?: string;
      size?: 'ms' | 's' | 'm' | 'l' | 'xl';
      panelClass?: string;
      backdropClass?: string;
      data?: any;
    } = {
      width: '100%',
      size: 'l',
      panelClass: 'custom-dialog-container',
      // backdropClass: 'backdropBackground',
    }
  ) {
    return this.dialog
      .open(component, {
        ...options,
        width: options?.size && this.size[options.size]?.width,
        height: options?.size && this.size[options.size]?.height,
        scrollStrategy: new NoopScrollStrategy(),
      })
      .afterClosed()
      .pipe(take(1));
  }
}
