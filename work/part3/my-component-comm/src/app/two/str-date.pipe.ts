import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strDate'
})
export class StrDatePipe implements PipeTransform {

  transform(date: string, delim?: string): string {
    if (!delim) {
      delim = '.';
    }
    if (date.length !== 8) {
      return date;
    }
    return date.substring(0, 4) + delim + date.substring(4, 6) + delim + date.substring(6);
  }

}
