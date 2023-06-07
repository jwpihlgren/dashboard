import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degToCompass'
})
export class DegToCompassPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const val = Math.floor((value / 22.5) + 0.5)
    const directions = ["N","NNO","NO","ONO","Ö","OSO", "SO", "SSO","S","SSV","SV","VSV","V","VNV","NV","NNV"]
    return directions[val % 16];
  }

}
