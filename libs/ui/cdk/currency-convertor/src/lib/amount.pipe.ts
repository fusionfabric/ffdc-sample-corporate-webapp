import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  constructor() {}

  public transform(value: any): any {
    if (value === 'CREDIT') {
      value = '+';
    } else {
      value = '-';
    }
    return value;
  }
}
