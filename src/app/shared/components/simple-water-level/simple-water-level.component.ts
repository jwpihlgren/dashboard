import { Component, input, Input, InputSignal } from '@angular/core';
import { IAreaChartConfig } from '../../models/area-chart-config';
import { IHydrologicalObservationsDataResponse } from '../../models/interfaces/smhi/hydrological-observations-data-response ';
import { AreaChartComponent } from '../area-chart/area-chart.component';
import { DatePipe } from '@angular/common';
import { HydrologicalMinMaxPipe } from '../../pipes/hydrological-min-max.pipe';
import { AddUnitPipe } from '../../pipes/add-unit.pipe';

@Component({
  selector: 'app-simple-water-level',
  templateUrl: './simple-water-level.component.html',
  styleUrls: ['./simple-water-level.component.css'],
  imports: [AreaChartComponent, DatePipe, HydrologicalMinMaxPipe, AddUnitPipe]
})
export class SimpleWaterLevelComponent {

  oceanographicalObservationsPeriodData: InputSignal<IHydrologicalObservationsDataResponse> = input.required()
  thresholdConfig: InputSignal<IThresholdConfig> =input({
    thresholdColors : ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholdsAsUnits : [20, 80, 0]
  })

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
    this.chartConfig = this.createChartConfig(this.oceanographicalObservationsPeriodData())
  }


  createChartConfig(data: IHydrologicalObservationsDataResponse): IAreaChartConfig {
    this.chartConfig.data = data.value.map((reading) => {
      return {date: new Date(reading.date), value: reading.value}
    })
    this.chartConfig.unit = data.parameter.unit
    this.chartConfig.domain = [Math.min(...this.chartConfig.data.map(reading => reading.value)), Math.max(...this.chartConfig.data.map(reading => reading.value))]
    this.chartConfig.thresholds = this.chartConfig.thresholds?.map((_, index: number) => {
      const domainMax: number = Math.max(...this.chartConfig.domain)
      if(index === this.thresholdConfig().thresholdsAsUnits.length - 1) return domainMax
      return this.thresholdConfig().thresholdsAsUnits[index] / domainMax
    })
    this.chartConfig.chartColors = this.thresholdConfig().thresholdColors.map((color: string) => color)
    return this.chartConfig
  }

}


interface IThresholdConfig  {
  thresholdColors: string[],
  thresholdsAsUnits: number[]
}
