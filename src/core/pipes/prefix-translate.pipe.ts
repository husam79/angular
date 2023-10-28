import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
})
export class PrefixTranslatePipe implements PipeTransform {
  transform(value: string, prefix: any): string {
    if (value) {
      return prefix + '.' + value;
    }
    return '';
  }
}
