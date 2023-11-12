import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, map } from 'rxjs';

type Resource = { prefix: string; suffix: string };
export class MultiTranslateHttpLoader implements TranslateLoader {
  resources: Resource[];
  withCommon: boolean;

  constructor(
    private readonly http: HttpClient,
    {
      resources,
      withCommon = true,
    }: { resources: Resource[]; withCommon?: boolean }
  ) {
    this.resources = resources;
    this.withCommon = withCommon;
  }

  getTranslation(lang: string): Observable<Record<string, unknown>> {
    let resources: Resource[] = [...this.resources];
    resources = [{ prefix: './assets/i18n/', suffix: '.json' }, ...resources];

    return forkJoin(
      resources.map((config: Resource) => {
        return this.http.get<Record<string, unknown>>(
          `${config.prefix}${lang}${config.suffix}`
        );
      })
    ).pipe(
      map((response: Record<string, unknown>[]) =>
        mergeObjectsRecursively(response)
      )
    );
  }
}
export const mergeObjectsRecursively = (
  objects: Record<string, unknown>[]
): Record<string, unknown> => {
  const mergedObject: any = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          mergedObject[key] = mergeObjectsRecursively([
            mergedObject[key],
            obj[key],
          ]);
        } else {
          mergedObject[key] = obj[key];
        }
      }
    }
  }

  return mergedObject;
};
