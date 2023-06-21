import { Component, DoCheck, Input, KeyValueDiffers, OnChanges, OnInit } from '@angular/core';
import { IForecastHourly } from '../../models/forecast-response.interface';
import { UviConverterPipe } from '../../pipes/uvi-converter.pipe';
import { WeatherService } from '../../services/weather.service';
import { IForecast } from '../../models/forecast.interface';

@Component({
  selector: 'app-detailed-weather-table',
  templateUrl: './detailed-weather-table.component.html',
  styleUrls: ['./detailed-weather-table.component.css']
})
export class DetailedWeatherTableComponent implements OnInit, DoCheck {

  SE_LOCALE: any = 'sv-SE'
  LOCALE_OPTIONS: any = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  }

  columnHeadings: IColumnHeading[] = [
    { title: 'Tid', type: "text" },
    { title: 'Temp \xB0C', type: "numerical" },
    { title: 'UV-I', type: "badge" },
    { title: 'Nederbörd', type: "numerical" },
    { title: 'Moln', type: "numerical" },
    { title: 'Väder', type: "symbol" },
  ]

  @Input() forecast!: IForecast
  differ: any

  tableRows: ITableRow[] = []

  constructor(
    private uviConverterPipe: UviConverterPipe,
    private weatherService: WeatherService,
    private differs: KeyValueDiffers
    ) { 
      this.differ = this.differs.find({}).create()
    }


  ngOnInit(): void {
    this.tableRows = this.createHourlyTableCells(this.forecast.hourly)
  }

  ngDoCheck(): void {
      const changes = this.differ.diff(this.forecast)
      if(changes) {
        this.tableRows = this.createHourlyTableCells(this.forecast.hourly)
      }
  }


  createHourlyTableCells(hourlyForecast: IForecastHourly[]): ITableRow[] {
      
      const rows: ITableRow[] = []
  
      hourlyForecast.forEach((hourlyData: IForecastHourly) => {
        rows.push({
          time: this.formatTime(hourlyData.validTime),
          temp: this.formatTemp(hourlyData.currentTemperature, hourlyData.apparentTemperature),
          uvi: this.formatUvi(hourlyData.UVI),
          precipitation: this.formatPrecipitation(hourlyData.minAmountOfPrecipitation, hourlyData.maxAmountOfPrecipitation),
          clouds: this.formatCloudiness(hourlyData.cloudiness), 
          symbol: this.formatSymbol(hourlyData.symbol)
        })
      })
  
      return rows
  }

  private formatTime(time: Date): ITableCell {
    return {
      value: new Date(time).toLocaleTimeString(this.SE_LOCALE, this.LOCALE_OPTIONS),
      type: 'text'
    }
  }

  private formatTemp(currentTemperature: number, apparentTemperature: number): ITableCell {
    return {
      value: `${Math.round(currentTemperature)}\xB0 (${Math.round(apparentTemperature)}\xB0)`,
      type: 'numerical'
    }
  }

  private formatUvi(uvi: number): ITableCell {
    return {value: this.uviConverterPipe.transform(uvi),
    type: 'badge'
    }
  }

  private formatPrecipitation(minAmountOfPrecipitation: number, maxAmountOfPrecipitation: number): ITableCell {
    return {
      value: `${minAmountOfPrecipitation} - ${maxAmountOfPrecipitation}mm`,
      type: 'numerical'
    }
  }

  private formatCloudiness(cloudiness: number): ITableCell {
    return {
      value: `${Math.round(cloudiness)} %`,
      type: 'numerical'
    }
  }

  private formatSymbol(symbol: number): ITableCell {
    return {
      value: this.weatherService.getIconUrl(symbol),
      type: 'symbol'
    }
  }

}



export interface IColumnHeading {
  title: string,
  type: 'text' | 'numerical' | 'badge' | 'symbol'
}

export interface ITableRow {
  time: ITableCell,
  temp: ITableCell,
  uvi: ITableCell,
  precipitation: ITableCell,
  clouds: ITableCell,
  symbol: ITableCell,
}

export interface ITableCell {
  value: string
  type: 'text' | 'numerical' | 'badge' | 'symbol'
}

