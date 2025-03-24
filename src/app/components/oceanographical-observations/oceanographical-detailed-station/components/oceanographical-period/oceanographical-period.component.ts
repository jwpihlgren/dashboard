import { DatePipe } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AreaChartComponent } from 'src/app/shared/components/area-chart/area-chart.component';
import { IAreaChartConfig } from 'src/app/shared/models/area-chart-config';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { AddUnitPipe } from 'src/app/shared/pipes/add-unit.pipe';
import { HydrologicalMinMaxPipe } from 'src/app/shared/pipes/hydrological-min-max.pipe';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-period',
  templateUrl: './oceanographical-period.component.html',
  styleUrls: ['./oceanographical-period.component.css'],
  imports: [AreaChartComponent, DatePipe, HydrologicalMinMaxPipe, AddUnitPipe]
})
export class OceanographicalPeriodComponent {

  protected route: ActivatedRoute = inject(ActivatedRoute)
  protected oceanographicalObservationsService: OceanographicalObservationsService = inject(OceanographicalObservationsService)

  oceanographicalObservationsData: Signal<IOceanographicalObservationsDataResponse | undefined> = signal(undefined)

  chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholds: [0.2, 0.7, 1],
    unit: '%',
    domain: [0, 1000],
    margins: { top: 20, right: 0, bottom: 30, left: 55 },
    data: []
  }

  constructor() {
    this.oceanographicalObservationsData = toSignal(
      this.route.parent!.paramMap.pipe(
        switchMap(params => {
          const station = parseInt(params.get("station") as string)
          const parameter = params.get("parameter") as string
          const period = this.route.snapshot.paramMap.get("period") as string
          return this.oceanographicalObservationsService.getPeriodData(parameter, station, period)
        })
      )
    )

  }

  createChartConfig(data: IOceanographicalObservationsDataResponse): IAreaChartConfig {
    this.chartConfig.data = data.value.map((reading) => {
      return { date: new Date(reading.date), value: reading.value }
    })
    this.chartConfig.unit = data.parameter.unit
    this.chartConfig.domain = [Math.min(...this.chartConfig.data.map(reading => reading.value)), Math.max(...this.chartConfig.data.map(reading => reading.value))]
    return this.chartConfig
  }

}
