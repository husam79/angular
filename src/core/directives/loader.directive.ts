import {
  ComponentFactoryResolver,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { Observable, tap, switchMap, of } from 'rxjs';
@Directive({
  selector: '[loader]',

  host: {
    '[style.position]': '"relative"',
  },
})
export class LoaderDirective {
  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input() set loader(obj: {
    one: () => Observable<any> | undefined;
    two?: (data?: any) => any;
  }) {
    // this.templateRef.createEmbeddedView(LoaderComponent);
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    if (obj) {
      obj
        .one()
        ?.pipe(
          tap(() => {
            // this.viewContainer.createComponent(LoaderComponent);
          }),
          switchMap((res: any) => {
            return obj.two ? obj.two(res) : of(res);
          })
        )
        .subscribe({
          next: (value: any) => {
            // this.viewContainer.clear();
            // this.viewContainer.createEmbeddedView(this.templateRef);
          },
        });
    }
  }
}
