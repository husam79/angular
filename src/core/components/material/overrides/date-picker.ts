import { MomentDateAdapter } from '@angular/material-moment-adapter';

export class CustomDateAdapter extends MomentDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}
