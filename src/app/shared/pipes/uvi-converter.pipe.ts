import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uviConverter'
})
export class UviConverterPipe implements PipeTransform {

  transform(value: number): string {
    let result: string = ""
    if(value <= 2) result = "Låg"
    else if(value <= 5) result = "Måttlig"
    else if(value <= 7) result = "Hög"
    else if(value <= 10) result = "Mycket hög"
    else if(value >= 11) result = "Extrem"
    return result
  }


}
