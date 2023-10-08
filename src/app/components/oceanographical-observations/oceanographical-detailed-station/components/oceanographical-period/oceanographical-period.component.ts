import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAreaChartConfig } from 'src/app/shared/models/area-chart-config';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-period',
  templateUrl: './oceanographical-period.component.html',
  styleUrls: ['./oceanographical-period.component.css']
})
export class OceanographicalPeriodComponent implements OnInit {


  oceanographicalObservationsData$?: Observable<IOceanographicalObservationsDataResponse>

  chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholds: [0.2, 0.7, 1 ],
    unit: '%',
    domain: [0, 1000],
    margins: {top: 20, right: 0, bottom: 30, left: 55},
    data: []
  }

  constructor(
    private route: ActivatedRoute,
    private oceanographicalObservationsService: OceanographicalObservationsService
    ) { }

  ngOnInit(): void {
    const station = parseInt(this.route.parent?.snapshot.paramMap.get("station") as string)
    const parameter = this.route.parent?.snapshot.paramMap.get("parameter") as string
    const period = this.route.snapshot.paramMap.get("period") as string

    this.oceanographicalObservationsData$ = this.oceanographicalObservationsService.getPeriodData(parameter, station, period)
  } 

  createChartConfig(data: IOceanographicalObservationsDataResponse): IAreaChartConfig {
    this.chartConfig.data = data.value.map((reading) => {
      return {date: new Date(reading.date), value: reading.value}
    })
    this.chartConfig.unit = data.parameter.unit
    this.chartConfig.domain = [Math.min(...this.chartConfig.data.map(reading => reading.value)), Math.max(...this.chartConfig.data.map(reading => reading.value))]
    return this.chartConfig
  }

}
