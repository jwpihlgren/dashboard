import { Pipe, PipeTransform } from '@angular/core';
import { ISMHIWaterLevelSample } from '../models/smhi-water-level-sample';

@Pipe({
  name: 'hydrologicalMinMax'
})
export class HydrologicalMinMaxPipe implements PipeTransform {

  transform(value: ISMHIWaterLevelSample[], minmax: "min" | "max", type: "value" | "date"): ISMHIWaterLevelSample {
    if(type === "value" && minmax === "min") {
      return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
        return acc.value <= cur.value ? acc : cur
      })
    }
    if(type === "value" && minmax === "max") {
      return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
        return acc.value >= cur.value ? acc : cur
      })
    }

    if(type === "date" && minmax === "min") {
      return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
        return acc.date <= cur.date ? acc : cur
      })
    }
    
    return value.reduce((acc: ISMHIWaterLevelSample , cur: ISMHIWaterLevelSample) => {
      return acc.date >= cur.date ? acc : cur
    })
  }
}
