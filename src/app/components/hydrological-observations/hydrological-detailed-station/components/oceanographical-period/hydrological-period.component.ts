import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AreaChartComponent } from 'src/app/shared/components/area-chart/area-chart.component';
import { IAreaChartConfig } from 'src/app/shared/models/area-chart-config';
import { IHydrologicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-data-response ';
import { AddUnitPipe } from 'src/app/shared/pipes/add-unit.pipe';
import { HydrologicalMinMaxPipe } from 'src/app/shared/pipes/hydrological-min-max.pipe';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';


@Component({
  selector: 'app-hydrological-period',
  templateUrl: './hydrological-period.component.html',
  styleUrls: ['./hydrological-period.component.css'],
  imports: [RouterOutlet, AreaChartComponent, DatePipe,HydrologicalMinMaxPipe, AddUnitPipe]
})
export class HydrologicalPeriodComponent implements OnInit {


  hydrologicalObservationsData$?: Observable<IHydrologicalObservationsDataResponse>

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
    private hydrologicalObservationsService: HydrologicalObservationsService
    ) { }

  ngOnInit(): void {
    const station = parseInt(this.route.parent?.snapshot.paramMap.get("station") as string)
    const parameter = this.route.parent?.snapshot.paramMap.get("parameter") as string
    this.route.paramMap.subscribe((params) => {
      const period = params.get("period") as string
      this.hydrologicalObservationsData$ = this.hydrologicalObservationsService.getPeriodData(parameter, station, period).pipe(
        tap((data) => console.log(data))
      )
    })


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
