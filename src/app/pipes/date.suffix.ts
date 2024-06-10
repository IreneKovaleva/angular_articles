import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'dateSuffix'})
export class DateSuffix implements PipeTransform {
  transform(value: string): string {
    let newValue = new Date(value);
    let suffix = 'th',
      day: number = newValue.getDate();

    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }

    return suffix;
  }
}
