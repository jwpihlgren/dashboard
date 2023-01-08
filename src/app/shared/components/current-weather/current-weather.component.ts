import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from '../../models/forecast.interface';
import { LanguageService } from '../../services/language.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    public languageService: LanguageService
  ) { }

  @Input() forecast!: IForecast

  ngOnInit(): void {
  }

  getIconUrl(icon: number): string {
    return this.weatherService.getIconUrl(icon)
  }

}
