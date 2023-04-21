import { UviConverterPipe } from './../../pipes/uvi-converter.pipe';
import { WeatherService } from './../../services/weather.service';
import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from '../../models/forecast.interface';
import { IForecastHourly } from '../../models/forecast-response.interface';
import { LanguageService } from '../../services/language.service';

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
    {title: "Temp \xB0C",
    classList: ["numerical"]
    },
    {title: "UV-I",
    classList: ["badge"]
    },
    {title: "Nederbörd",
    classList: ["numerical"]
    },
/*     {title: "Typ",
    classList: ["numerical"]
    }, */
    {title: "Moln",
    classList: ["numerical"]
    },
    {title: "Väder",
    classList: ["image"]
    },

  ]

  tableData!: any[]

  @Input() forecast!: IForecast
  weatherMatrix!: any[]

  constructor(
    private uviConverterPipe: UviConverterPipe,
    private weatherService: WeatherService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.tableData = this.createHourlyTableCells(this.forecast.hourly)
  }

  createHourlyTableCells(arr: any[]): any[] {

    const hourlyTableCells: any[] = []

    arr.forEach((hourlyData: IForecastHourly, index: number) => {
      hourlyTableCells.push(this.getTime(hourlyData, ['text']))
      hourlyTableCells.push(this.getTemperature(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getUVI(hourlyData, ['badge']))
      hourlyTableCells.push(this.getprecipitationAmount(hourlyData, ['numerical']))
/*       hourlyTableCells.push(this.getprecipitationType(hourlyData, ['numerical'])) */
      hourlyTableCells.push(this.getClouds(hourlyData, ['numerical']))
      hourlyTableCells.push(this.getWeatherIcon(hourlyData, ['image']))
    })
    return hourlyTableCells
  }

  getIconUrl(icon: number): string {
    return this.weatherService.getIconUrl(icon)
 }

 private getTime(hourlyData: IForecastHourly, classList: string[]): ITableCell {
  const time = {
    classList: classList,
    value: new Date(hourlyData.validTime).toLocaleTimeString('se-SV', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
      
    })
  }
  return (time)
 }

 private getTemperature(hourlyData: IForecastHourly, classList: string[]): ITableCell {
  const temperature: ITableCell = {
    classList: classList,
    value: `${Math.round(hourlyData.currentTemperature)}\xB0 (${Math.round(hourlyData.apparentTemperature)}\xB0)`
  }
  return temperature
 }

 private getUVI(hourlyData: IForecastHourly, classList: string[]): ITableCell {
  const UVI: ITableCell = {
    classList: classList,
    value: this.uviConverterPipe.transform(hourlyData.UVI)
  }
  return UVI
 }

private getprecipitationAmount(hourlyData: IForecastHourly, classList: string[]): ITableCell {

  const precipitationAmount: number = (hourlyData.maxAmountOfPrecipitation + hourlyData.minAmountOfPrecipitation / 2)
  const probabilityOfprecipitation: ITableCell = {
    classList: classList,
    value: `${precipitationAmount.toFixed(1)} mm `
  }
  return probabilityOfprecipitation
}
private getprecipitationType(hourlyData: IForecastHourly, classList: string[]): ITableCell {

  const precipitationAmount: ITableCell = {
    classList: classList,
    value: this.languageService.getTranslatedPercipitationType(hourlyData.precipitationType)
  }
  return precipitationAmount
}

private getClouds(hourlyData: IForecastHourly, classList: string[]): ITableCell {
  const clouds: ITableCell = {
    classList: classList,
    value: `${Math.round(hourlyData.cloudiness)} %`
  }
  return clouds
}

private getWeatherIcon(hourlyData: IForecastHourly, classList: string []): ITableCell {
  const weatherIcon: ITableCell = {
    classList: classList,
    value: hourlyData.symbol
  }

  return weatherIcon
}

}

interface ITableCell {
  classList: string[],
  value: string | number
}

