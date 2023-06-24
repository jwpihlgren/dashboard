import { TranslationService } from './../../services/translation.service';
import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from '../../models/forecast.interface';
import { WeatherService } from '../../services/weather.service';
import { faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit{

  icons: any = {
      faArrowDown,
      faArrowUp
  }

  windDirectionArrowRotation!: string
  airPressureChangeIndicator!: any

  @Input() forecast!: IForecast

  constructor(
    private weatherService: WeatherService,
    public translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.setWindDirectionArrowRotation()
    this.setAirPressureIndicator()
  }

  getIconUrl(icon: number): string {
    return this.weatherService.getIconUrl(icon)
  }

  setWindDirectionArrowRotation() {
    this.windDirectionArrowRotation = `rotate(${this.forecast.current.windDirection}deg)`
  }

  setAirPressureIndicator(): void {
    if(this.forecast.airPressureChange === -1) this.airPressureChangeIndicator = this.icons.faArrowDown
    if(this.forecast.airPressureChange === 1) this.airPressureChangeIndicator = this.icons.faArrowUp
  }
}