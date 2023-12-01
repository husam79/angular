import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  exhaustMap,
  map,
  take,
  throwError,
  of,
} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotifierService } from '../services/notifier.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private _translateService: TranslateService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  getCurrentLanguage(): string {
    if (this._translateService.currentLang)
      return this._translateService.currentLang;
    else return this._translateService.getDefaultLang();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(1).pipe(
      take(1),
      exhaustMap((currentUser) => {
        const modifiedReq = req.clone({
          setHeaders: {
            Accept: 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
        });

        return next
          .handle(modifiedReq)
          .pipe(
            map((event) => {
              if (event instanceof HttpResponse) {
                if (
                  (req.method == 'POST' ||
                    req.method == 'PUT' ||
                    req.method == 'DELETE') &&
                  event.status >= 200 &&
                  event.status <= 299
                ) {
                  this.notifierService.showNotification('', 'success');
                }
              }
              return event;
            }),
            catchError((err) => {
              if (
                err.status == 403 ||
                (req.method == 'GET' && err.status == 400)
              ) {
                this.notifierService.showNotification(err.error.msg, 'error');
                this.router.navigate(['/authentication/login']);
              }
              if (err.error.status == 'error') {
                this.notifierService.showNotification(err.error.msg, 'warning');
              }

              return throwError(() => err);
            })
          )
          .pipe(
            catchError((error) => {
              return throwError(() => error);
            })
          );
      })
    );
  }
}
