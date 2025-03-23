import { Component, input, InputSignal } from "@angular/core";
import { IForecastDaily } from "../../models/forecast-response.interface";
import { IForecast } from '../../models/forecast.interface';
import { BarRangeChartComponent } from "../bar-range-chart/bar-range-chart.component";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  imports: [BarRangeChartComponent]
})

export class WeatherCardComponent{

  forecastDataSeries: [] = []

  forecast: InputSignal<IForecast> = input.required()

  createForecastDataSeries(forecastDays: IForecastDaily[]): any {
    return [...forecastDays]
  }


}
