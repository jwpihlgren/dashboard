import { Component } from '@angular/core';

@Component({
  selector: 'app-detailed-weather-table-alt',
  templateUrl: './detailed-weather-table-alt.component.html',
  styleUrls: ['./detailed-weather-table-alt.component.css']
})
export class DetailedWeatherTableAltComponent {

  columnHeadings: IColumnHeading[] = [
    {
      title: 'Tid'
    },
    {
      title: 'Temp \xB0C'
    },
    {
      title: 'UV-I'
    },
    {
      title: 'Nederbörd'
    },
    {
      title: 'Moln'
    },
    {
      title: 'Väder'
    },
  ]

  tableRows: ITableRow[] = [
    {
      time: '12:00',
      temp: 12,
      uvi: 2,
      precipitation: 0,
      clouds: 0,
      weather: 'https://openweathermap.org/img/wn/01d.png'
    },
  ]

}

export interface IColumnHeading {
  title: string,
}

export interface ITableRow {
  time: TableCell,
  temp: TableCell,
  uvi: TableCell,
  precipitation: TableCell,
  clouds: TableCell,
  weather: TableCell,
}


type TableCell = string | number | URL
