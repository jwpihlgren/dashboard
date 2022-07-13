import { UviConverterPipe } from './../../pipes/uvi-converter.pipe';
import { WeatherService } from './../../services/weather.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-weather-table',
  templateUrl: './detailed-weather-table.component.html',
  styleUrls: ['./detailed-weather-table.component.css']
})
export class DetailedWeatherTableComponent implements OnInit {

  columnHeadings: string[] = [
    "Tid",
    "Temp (känns som)",
    "UV-I",
    "Risk för regn",
    "Nederbörd",
    "Molnighet",
    "Väder"
  ]

  @Input() hourlyWeatherArr!: any[]
  weatherMatrix!: any[]

  constructor(
    private uviConverterPipe: UviConverterPipe,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherMatrix = this.createHourlyMatrix(this.hourlyWeatherArr)
  }

  createHourlyMatrix(arr: any[]): any[] {

    const hourMatrix: any[] = []
    arr.slice(0, 8).forEach((hourlyData: any, index: number) => {
      const hourRow = []
      hourRow.push(new Date(hourlyData.dt * 1000).toLocaleTimeString('se-SV', {
        hour: '2-digit',
        minute: '2-digit'
      }))
      hourRow.push(`${Math.round(hourlyData.temp)} ( ${Math.round(hourlyData.feels_like)} ) \xB0C`)
      hourRow.push(this.uviConverterPipe.transform(hourlyData.uvi))
      hourRow.push(`${Math.round(hourlyData.pop * 100)} %`)
      if(hourlyData.snow) {
        hourRow.push(`${hourlyData.snow["1h"]} mm`)
      }
      else if(hourlyData.rain) {
        hourRow.push(`${hourlyData.rain["1h"]} mm`)
      }
      else {
        hourRow.push('0 mm')
      }
      hourRow.push(`${hourlyData.clouds} %`)
      hourRow.push(hourlyData.weather[0].icon)
      hourMatrix.push(hourRow)
    })
    return hourMatrix
  }

  getIconUrl(icon: string): string {
    return this.weatherService.getIconUrl(icon)
 }

}

