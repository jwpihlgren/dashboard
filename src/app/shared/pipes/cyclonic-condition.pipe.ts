import { TranslationService } from './../services/translation.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cyclonicCondition'
})
export class CyclonicConditionPipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(value: number): unknown {

    let condition: number = 0
    if(value < 1005) condition = 1
    if(value > 1020) condition = 2

    return this.translationService.translateCyclonicCondition(condition)

  }

}
