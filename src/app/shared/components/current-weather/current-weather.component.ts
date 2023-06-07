import { TranslationService } from './../../services/translation.service';
import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from '../../models/forecast.interface';
import { WeatherService } from '../../services/weather.service';
import { faArrowDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  icons: any = {
    faArrowDown,
  }

  @Input() forecast!: IForecast

  constructor(
    private weatherService: WeatherService,
    public translationService: TranslationService,
  ) { }



  ngOnInit(): void {
  }

  getIconUrl(icon: number): string {
    return this.weatherService.getIconUrl(icon)
  }

  rotate(degrees: number): string {
    return `rotate(${degrees}deg)`
  }

}
