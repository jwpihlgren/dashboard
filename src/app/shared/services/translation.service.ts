import { Injectable } from '@angular/core';
import * as sv_translations from '../../../assets/text/sv.json'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations = sv_translations

  setLanguage(language: language): void {
    switch(language) {
      case "sv": this.translations = sv_translations; break;
      default: this.translations = sv_translations; break;
    }
  }

  translateWeatherSymbol(symbol: number): string {
    const translations: any = this.translations.weather.symbols
    if(!translations[symbol]) return ("")
    return translations[symbol] as string
  }

  translateWeatherPrecipitationType(type: 0 | 1 | 2 | 3 | 4 | 5 | 6): string {
    const translations: any = this.translations.weather.precipitationType
    if(!translations[type]) return ("")
    return translations[type] as string
  }
}


type language = "sv"
