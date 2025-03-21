import { TranslationService } from './../../services/translation.service';
import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from '../../models/forecast.interface';
import { WeatherService } from '../../services/weather.service';
import { faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CyclonicConditionPipe } from '../../pipes/cyclonic-condition.pipe';
import { AddUnitPipe } from '../../pipes/add-unit.pipe';
import { DegToCompassPipe } from '../../pipes/deg-to-compass.pipe';
import { DateFnsModule } from 'ngx-date-fns';
import { StringToDatePipe } from '../../pipes/string-to-date.pipe';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  imports: [FontAwesomeModule, CyclonicConditionPipe, AddUnitPipe, DegToCompassPipe, DateFnsModule, StringToDatePipe]
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
