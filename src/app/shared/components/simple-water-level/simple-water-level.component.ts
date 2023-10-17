import { Component, Input } from '@angular/core';
import { IAreaChartConfig } from '../../models/area-chart-config';
import { IAreaChartData } from '../../models/area-chart-data';
import { ISMHIWaterLevelSample } from '../../models/smhi-water-level-sample';
import { IOceanographicalObservationsPeriodResponse, } from '../../models/interfaces/smhi/oceanographical-observations-period-response';
import { IHydrologicalObservationsDataResponse } from '../../models/interfaces/smhi/hydrological-observations-data-response ';

@Component({
  selector: 'app-simple-water-level',
  templateUrl: './simple-water-level.component.html',
  styleUrls: ['./simple-water-level.component.css']
})
export class SimpleWaterLevelComponent {

 /*  stationWaterLevelData$!: Observable<ISMHIHydrologicalStationWaterLevelData> */
  @Input() oceanographicalObservationsPeriodData!: IHydrologicalObservationsDataResponse

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
    this.chartConfig = this.createChartConfig(this.oceanographicalObservationsPeriodData)
  }


  createChartConfig(data: IHydrologicalObservationsDataResponse): IAreaChartConfig {
    this.chartConfig.data = data.value.map((reading) => {
      return {date: new Date(reading.date), value: reading.value}
    })
    this.chartConfig.unit = data.parameter.unit
    this.chartConfig.domain = [Math.min(...this.chartConfig.data.map(reading => reading.value)), Math.max(...this.chartConfig.data.map(reading => reading.value))]
    return this.chartConfig
  }

}
