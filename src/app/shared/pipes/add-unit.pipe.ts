import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addUnit'
})
export class AddUnitPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return `${Math.round(value)} ${args[0]}`;
  }

}
