import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { tap, switchMap, of, catchError } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnChanges {
  @Input() api: any;
  @Input() refresh: boolean | null = null;
  loginSvg: AnimationOptions = {
    path: '/assets/animations/loader.json',
  };
  loader: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['api']?.currentValue) {
      const obj = changes['api']?.currentValue;
      if (!obj.two) this.setLoader(true);
      obj
        .one()
        ?.pipe(
          switchMap((res: any) => {
            this.setLoader(true);
            return obj.two ? obj.two(res) : of(res);
          }),
          catchError((err: any) => {
            this.setLoader(false);
            console.log(this.loader);
            return of([]);
          })
        )
        .subscribe(() => {
          this.setLoader(false);
        });
    }
    if (changes && changes['refresh']?.currentValue !== null) {
      const obj = this.api;
      if (!obj.two) this.setLoader(true);
      obj
        .one()
        ?.pipe(
          switchMap((res: any) => {
            this.setLoader(true);
            return obj.two ? obj.two(res) : of(res);
          }),
          catchError((err: any) => {
            this.setLoader(false);
            console.log(this.loader);
            return of([]);
          })
        )
        .subscribe(() => {
          this.setLoader(false);
        });
    }
  }
  toggleLoader() {
    this.loader = !this.loader;
  }
  setLoader(value: boolean) {
    this.loader = value;
  }
}
