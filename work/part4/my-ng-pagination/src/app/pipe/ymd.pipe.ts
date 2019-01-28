import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ymd'
})
export class YmdPipe implements PipeTransform {

  transform(date: string, delim?: string): string {
    if (!delim) {
      delim = '.';
    }

    let ymd = date.substring(0, 10);
    ymd = ymd.replace(/-/g, '');

    if (ymd.length !== 8) {
      return date;
    }
    return ymd.substring(0, 4) + delim + ymd.substring(4, 6) + delim + ymd.substring(6);
  }

}
