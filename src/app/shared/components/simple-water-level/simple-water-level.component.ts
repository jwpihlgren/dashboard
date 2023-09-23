import { Component, Input } from '@angular/core';
import { ISMHIHydrologicalStationWaterLevelData } from '../../models/smhi-hydrological-station-water-level-data';
import { IAreaChartConfig } from '../../models/area-chart-config';
import { IAreaChartData } from '../../models/area-chart-data';
import { ISMHIWaterLevelSample } from '../../models/smhi-water-level-sample';

@Component({
  selector: 'app-simple-water-level',
  templateUrl: './simple-water-level.component.html',
  styleUrls: ['./simple-water-level.component.css']
})
export class SimpleWaterLevelComponent {

 /*  stationWaterLevelData$!: Observable<ISMHIHydrologicalStationWaterLevelData> */
  @Input() stationWaterLevelData!: ISMHIHydrologicalStationWaterLevelData

  chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholds: [0.2, 0.7, 1 ],
    unit: '%',
    domain: [0, 1000],
    margins: {top: 20, right: 0, bottom: 30, left: 65},
    data: []
  }

  constructor() { }

  ngOnInit(): void {
    this.chartConfig = this.getChartConfig(this.stationWaterLevelData)
  }

  toChartData(data: ISMHIWaterLevelSample[]): IAreaChartData[] {
    const chartData: IAreaChartData[] = data.map((reading: ISMHIWaterLevelSample) => {
      return {date: new Date(reading.date), value: reading.value}
    })
    return chartData
  }

  getChartConfig(data: ISMHIHydrologicalStationWaterLevelData): IAreaChartConfig {
    this.chartConfig.data = this.toChartData(data.value)
    this.chartConfig.unit = data.parameter.unit
    this.chartConfig.domain = [Math.min(...this.chartConfig.data.map(reading => reading.value)), Math.max(...this.chartConfig.data.map(reading => reading.value))]
    return this.chartConfig
  }

}
