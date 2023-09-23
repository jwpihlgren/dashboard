import { ISMHIHydrologicalStationWaterLevelData } from './../../shared/models/smhi-detailed-water-level';
import { ISMHIHydrologicalStationWithPeriods } from './../../shared/models/smhi-hydrological-station-with-periods';
import { WaterLevelService } from './../../shared/services/water-level.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAreaChartConfig } from 'src/app/shared/models/area-chart-config';
import { IAreaChartData } from 'src/app/shared/models/area-chart-data';
import { ISMHIWaterLevelSample } from 'src/app/shared/models/smhi-water-level-sample';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  hydrologicalStations$!: Observable<ISMHIHydrologicalStationWithPeriods[]>
  stationWaterLevelData$?: Observable<ISMHIHydrologicalStationWaterLevelData>

  chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholds: [0],
    unit: '%',
    domain: [0, 1000],
    data: []
  }
  

  constructor(private waterLevelService: WaterLevelService) { }

  ngOnInit(): void {
    this.hydrologicalStations$ = this.waterLevelService.getHydrologicalStations()
  }

  setStationWaterLevelData(id: number) {
    this.stationWaterLevelData$ = this.waterLevelService.getWaterLevel(id)
  }

  clearStationWaterLevelData() {
    this.stationWaterLevelData$ = undefined
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
    this.chartConfig.domain = [0, Math.max(...this.chartConfig.data.map(reading => reading.value))]
    return this.chartConfig
  }

}
