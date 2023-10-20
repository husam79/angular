import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
})
export class PrefixTranslatePipe implements PipeTransform {
  transform(value: string, prefix: any): string {
    console.log(prefix);
    if (value) {
      return prefix + '.' + value;
    }
    return '';
  }
}
