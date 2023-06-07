import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any): any {
    console.log(typeof value);
    return typeof value;
  }

}
