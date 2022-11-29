import { UviConverterPipe } from './../../pipes/uvi-converter.pipe';
import { WeatherService } from './../../services/weather.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-weather-table',
  templateUrl: './detailed-weather-table.component.html',
  styleUrls: ['./detailed-weather-table.component.css']
})
export class DetailedWeatherTableComponent implements OnInit {


  tableHeadings: any[] = [
    {title: "Tid",
    classList: ["text"]
    },
    {title: "Temp (känns som) \xB0C",
    classList: ["numerical"]
    },
    {title: "UV-I",
    classList: ["badge"]
    },
    {title: "Risk för regn",
    classList: ["numerical"]
    },
    {title: "Nederbörd",
    classList: ["numerical"]
    },
    {title: "Molnighet",
    classList: ["numerical"]
    },
    {title: "Väder",
    classList: ["image"]
    },

  ]

  tableData!: any[]

  @Input() forecast: any
  weatherMatrix!: any[]

  constructor(
    private uviConverterPipe: UviConverterPipe,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.tableData = this.createHourlyTableCells(this.forecast.hourly)
  }

  createHourlyTableCells(arr: any[]): any[] {

    const hourlyTableCells: any[] = []

    arr.forEach((hourlyData: any, index: number) => {
      hourlyTableCells.push(this.getTime(hourlyData, ['text']))
      hourlyTableCells.push(this.getTemperature(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getUVI(hourlyData, ['badge']))
      hourlyTableCells.push(this.getProbabilityOfPercipitation(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getPercipitationAmount(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getClouds(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getWeatherIcon(hourlyData, ['image']))
    })
    return hourlyTableCells
  }

  getIconUrl(icon: string): string {
    return this.weatherService.getIconUrl(icon)
 }

 private getTime(hourlyData: any, classList: string[]): ITableCell {
  const time = {
    classList: classList,
    value: new Date(hourlyData.dt * 1000).toLocaleTimeString('se-SV', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  return (time)
 }

 private getTemperature(hourlyData: any, classList: string[]): ITableCell {
  const temperature: ITableCell = {
    classList: classList,
    value: `${Math.round(hourlyData.temp)}\xB0 (${Math.round(hourlyData.feels_like)}\xB0)`
  }
  return temperature
 }

 private getUVI(hourlyData: any, classList: string[]): ITableCell {
  const UVI: ITableCell = {
    classList: classList,
    value: this.uviConverterPipe.transform(hourlyData.uvi)
  }
  return UVI
 }

private getProbabilityOfPercipitation(hourlyData: any, classList: string[]): ITableCell {
  const probabilityOfPercipitation: ITableCell = {
    classList: classList,
    value: `${Math.round(hourlyData.pop * 100)} %`
  }
  return probabilityOfPercipitation
}
private getPercipitationAmount(hourlyData: any, classList: string[]): ITableCell {
  let percipitationFromSnowOrRain;
  if(hourlyData.snow) percipitationFromSnowOrRain = hourlyData.snow["1h"] + " mm"
  else if(hourlyData.rain) percipitationFromSnowOrRain = hourlyData.rain["1h"] + " mm"
  else percipitationFromSnowOrRain = "0 mm"

  const percipitationAmount: ITableCell = {
    classList: classList,
    value: percipitationFromSnowOrRain
  }
  return percipitationAmount
}

private getClouds(hourlyData: any, classList: string[]): ITableCell {
  const clouds: ITableCell = {
    classList: classList,
    value: `${Math.round(hourlyData.clouds)} %`
  }
  return clouds
}

private getWeatherIcon(hourlyData: any, classList: string []): ITableCell {
  const weatherIcon: ITableCell = {
    classList: classList,
    value: hourlyData.weather[0].icon,
  }

  return weatherIcon
}

}

interface ITableCell {
  classList: string[],
  value: string | number
}

