import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export class CRUDService<T> {
  protected readonly apiURL: string;

  constructor(private http: HttpClient, protected readonly entityName: string) {
    this.apiURL = `${environment.baseURL}/${this.entityName}`;
  }

  protected createEntity(
    apiExtension: string,
    body?: T | FormData,
    showMessage: string = 'false',
    queryParams?: { [key: string]: string }
  ): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    const url = this.joinEntityUrl(apiExtension);
    return this.http.post(url, body, {
      headers: { showMessage: showMessage },
      params,
    });
  }
  protected readEntity(
    apiExtension: string,
    id: number | string
  ): Observable<any> {
    const url = this.joinEntityUrl(apiExtension, id);
    return this.http.get(url);
  }
  private joinEntityUrl(apiExtension: string, id?: number | string): string {
    return id
      ? [this.apiURL, apiExtension, id].join('/')
      : [this.apiURL, apiExtension].join('/');
  }
}
