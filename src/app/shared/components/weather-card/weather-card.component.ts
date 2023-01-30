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

  constructor() {
    
  }

  epochToDay(epoch: any): string {
    const weekday = ["Sön","Mån","Tis","Ons","Tor","Fre","Lör"];
    const day = new Date(epoch)
    return `${weekday[day.getDay()]}`
  }

  createForecastDataSeries(forecastDays: IForecastDaily[]): any {
    const forecastDataSeries = forecastDays.map((day: IForecastDaily) => {
      day.minTemperature = day.minTemperature
      day.maxTemperature = day.maxTemperature

      return day
    })
    return forecastDataSeries
  }


}
