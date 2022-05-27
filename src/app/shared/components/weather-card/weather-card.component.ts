import { Component, Input, OnInit, ViewChild } from "@angular/core";
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {


  forecastDataSeries: [] = [] 


  @Input() forecast: any


  constructor() { }

  ngOnInit(): void {

    console.log(this.createForecastDataSeries(this.forecast.daily));
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
         maxTemp: Math.round(day.temp.max)
      }
    })
    //return forecastDataSeries.slice(0, forecastDataSeries.length - 1)
    return forecastDataSeries
  }

}
