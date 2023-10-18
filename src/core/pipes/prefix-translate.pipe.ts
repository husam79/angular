import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
})
export class PrefixTranslatePipe implements PipeTransform {
  transform(value: string, prefix: string): string {
    if (value) {
      return prefix + '.' + value;
    }
    return '';
  }
}
