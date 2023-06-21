import { Component, Input, OnInit} from "@angular/core";
import { IForecastDaily } from "../../models/forecast-response.interface";
import { IForecast } from '../../models/forecast.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})

export class WeatherCardComponent{

  forecastDataSeries: [] = []

  @Input() forecast!: IForecast

  createForecastDataSeries(forecastDays: IForecastDaily[]): any {
    return [...forecastDays]
  }


}
