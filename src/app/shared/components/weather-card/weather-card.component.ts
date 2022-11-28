import { WeatherService } from './../../services/weather.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})

export class WeatherCardComponent implements OnInit {

  forecastDataSeries: [] = []

  @Input() forecast: any

  constructor(
    private weatherService: WeatherService
  ) { 
  }

  ngOnInit(): void {
  }

  epochToDay(epoch: any): string {
    const weekday = ["Sön","Mån","Tis","Ons","Tor","Fre","Lör"];
    const day = new Date(epoch)
    return `${weekday[day.getDay()]}`
  }

  createForecastDataSeries(forecastDays: any[]): any {
    const forecastDataSeries = forecastDays.map((day: any) => {
      return {
        day: this.epochToDay(day.dt * 1000),
        minTemp: Math.round(day.temp.min), 
        maxTemp: Math.round(day.temp.max),
        icon: day.weather[0].icon
      }
    })
    return forecastDataSeries.slice(0, forecastDataSeries.length - 1) //Remove the 8th result because we only show 7
  }

}
