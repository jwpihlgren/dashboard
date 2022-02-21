import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  chartSettings = {
    title: {
      text: "&deg;C",
      visible: true,
      font: {
        family: "'Raleway', sans-serif",
        weight: 600,
        size: 16,
        color: "#767676",
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
    },
    commonAxisSettings: {
      tick: {
        visible: false
      },
      label: {
        font: {
          family: "'Raleway', sans-serif",
          weight: 600,
          size: 16
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
      tickInterval:"5",
      visualRange: {
        startValue: -20,
        length: 50
      },
      visualRangeUpdateMode: "auto",
    }],
    series: [{
      rangeValue1Field:"minTemp",
      rangeValue2Field:"maxTemp",
      name:"Days",
      showInLegend:"false"
      }],
    palette: ["#3e8ac5", "#ddd321"],
    customizePoint: (point: any) => {
      const customProperties: any = {}
      if (point.argument === "Thu") {
        customProperties['color'] = "#ddd321";
      }
      return customProperties
    } 
  }

  temperatures = [
    {
      day: "Mon",
      minTemp: -2,
      maxTemp: -2 
    },
    {
      day: "Tue",
      minTemp: -5,
      maxTemp: 10 
    },
    {
      day: "Wed",
      minTemp: -5,
      maxTemp: 10,
    },
    {
      day: "Thu",
      minTemp: -5,
      maxTemp: 25,
    },
    {
      day: "Fri",
      minTemp: -5,
      maxTemp: 10 
    },
    {
      day: "Sat",
      minTemp: -5,
      maxTemp: 10 
    },
    {
      day: "Sun",
      minTemp: -4,
      maxTemp: 10 
    },
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
