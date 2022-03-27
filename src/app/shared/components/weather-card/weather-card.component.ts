import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent

  chartSettings = {
    title: {
      text: "&deg;C",
      visible: true,
      font: {
        family: "'Raleway', sans-serif",
        weight: 600,
        size: 16,
        color: "#272727",
        horizontalAlignment: "left"
      }
    },
    commonPaneSettings: {
      backgroundColor: "#fff",
    },
    commonSeriesSettings: {
      argumentField:"day",
      type:"rangeBar",
      cornerRadius:"10",
      barWidth:"20",
      minBarSize:"10",
      color: "#ddd111"
    },
    commonAxisSettings: {
      tick: {
        visible: false
      },
      label: {
        font: {
          family: "'Raleway', sans-serif",
          weight: 600,
          size: 16,
          opacity: 1
        }
      }
    },
    margin: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 30
    },
    legend: {
      visible: false
    },
    valueAxis: [{
      constantLines: [],
      tickInterval:"5",
      visualRange: {
        startValue: -15,
        length: 50
      },
      visualRangeUpdateMode: "auto",
    }],
    series: [{
      rangeValue1Field:"minTemp",
      rangeValue2Field:"maxTemp",
      name:"Days",
      showInLegend:"false",
      color: "rgba(66, 148, 238,1)"
      }],
    customizePoint: (point: any) => {
      const customProperties: any = {}
      if (point.argument === this.epochToDay(Date.now())) {
        customProperties['color'] = "rgb(35,210,175)";
      }
      return customProperties
    } 
  }

  forecastDataSeries: [] = [] 


  @Input() forecast: any


  constructor() { }

  ngOnInit(): void {
    this.forecastDataSeries = this.createForecastDataSeries(this.forecast.daily)
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
      }
    })
    return forecastDataSeries.slice(0, forecastDataSeries.length - 1)
  }

}
