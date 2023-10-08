import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IAreaChartConfig } from 'src/app/shared/models/area-chart-config';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { IOceanographicalObservationsPeriodResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-station-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-detailed-station',
  templateUrl: './oceanographical-detailed-station.component.html',
  styleUrls: ['./oceanographical-detailed-station.component.css']
})
export class OceanographicalDetailedStationComponent implements OnInit {

  oceanographicalObservationsStation$?: Observable<IOceanographicalObservationsStationResponse>
  oceanographicalObservationsPeriod$?: Observable<IOceanographicalObservationsPeriodResponse>
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
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
   
  ngOnInit(): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.oceanographicalObservationsStation$ = this.oceanographicalObservationsService.getStation(parameter, station).pipe(
        tap((data) => console.log(data))
      )
  }

  setPeriodData(period: string): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.oceanographicalObservationsPeriod$ = this.oceanographicalObservationsService.getPeriod(parameter, station, period)
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

  back(): void {
    this.router.navigate(['/oceanographical-observations', 'parameter', this.route.snapshot.paramMap.get("parameter")])
  }
}

