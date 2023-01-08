import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languages: language[] = ["sv"]
  private currentLanguage: language = "sv"

  constructor(private httpService: HttpClient) { }

  getLanguages(): language[] {
    return this.languages.map((language: language) => language)
  }

  getLanguage(): language {
    return this.currentLanguage
  }

  setLanguage(language: language): void{
    this.currentLanguage = language
  }


  getTranslatedPercipitationType(type: 0 | 1 | 2 | 3 | 4 | 5 | 6): string {
    const precipitationTypes = {
        0: "Ingen nederbörd",
        1: "Snö",
        2: "Snöblandat regn",
        3: "Regn",
        4: "Duggregn",
        5: "Underkylt regn",
        6: "Underkylt duggregn"
    }
    return precipitationTypes[type]
  }
}


type language = "sv" 

