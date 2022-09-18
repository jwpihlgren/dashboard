import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoToDate'
})
export class IsoToDatePipe implements PipeTransform {

  transform(value: string): String {
    const date = new Date(value)
    return `${date.toLocaleDateString("sv-SV")} ${date.toLocaleTimeString("sv-SV")}`;
  }

}
