import { Pipe, PipeTransform } from '@angular/core';
import { ISMHIWaterLevelSample } from '../models/smhi-water-level-sample';

@Pipe({
  name: 'hydrologicalMinMax'
})
export class HydrologicalMinMaxPipe implements PipeTransform {

  transform(value: ISMHIWaterLevelSample[], minmax: "min" | "max"): ISMHIWaterLevelSample {
    if(minmax === "min") {
      return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
        return acc.value <= cur.value ? acc : cur
      })
    }
    return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
      return acc.value >= cur.value ? acc : cur
    })
    
  }

}
