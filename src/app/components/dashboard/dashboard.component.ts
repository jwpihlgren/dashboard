import { OceanographicalObservationsService } from './../../shared/services/oceanographical-observations.service';
import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { Observable, ReplaySubject, takeUntil, share, switchMap, timer, delay } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location.interface';
import { ISensor } from 'src/app/shared/models/sensor.interface';
import { IForecast } from 'src/app/shared/models/forecast.interface';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { IThresholdConfig } from 'src/app/shared/models/interfaces/threshold-config';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  defaultStation = 35101 //Juten sjöv
  defaultParameter = "13" // Havsvattenstånd, minutvärde
  defaultPeriod = "latest-day" // latest-day | latest-hour
  thresholdConfig: IThresholdConfig = {
   thresholdColors : ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholdsAsUnits: [20, 80, 0]
  }

//  sensors$!: Observable<ISensor[]>
  forecast$!: Observable<IForecast>
  stationWaterLevelData$!: Observable<IOceanographicalObservationsDataResponse>
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1)

  constructor(
 //   private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private oceanographicalObservationsService: OceanographicalObservationsService,
  ){}

  ngOnInit(): void {

 //   this.sensors$ = this.sensorService.getSensors()
    this.forecast$ = this.getForecast()
    this.stationWaterLevelData$ = this.getPeriodData()
  }

  ngOnDestroy(): void {
//    this.sensorService.eventSourceDestory()
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  getForecast(): Observable<IForecast> {
    const delay = 0;
    const everyTwoHours = 1000 * 60 * 60 * 0.5

    return timer(delay, everyTwoHours).pipe(
      switchMap(() => {
        return this.locationService.getUserFavoriteLocation().pipe(
          switchMap((favoriteLocation: ILocation) => {
            return this.weatherService.getForecast(favoriteLocation)
          })
        )
      }),
      share())
  }

  getPeriodData(): Observable<IOceanographicalObservationsDataResponse> {
    const delay = 0;
    const everyTwoHours = 1000 * 60 * 60 * 0.5

    return timer(delay, everyTwoHours).pipe(
      switchMap(() => {
        return this.oceanographicalObservationsService.getPeriod(this.defaultParameter, this.defaultStation, this.defaultPeriod).pipe(
          switchMap(() => {
            return this.oceanographicalObservationsService.getPeriodData(this.defaultParameter, this.defaultStation, this.defaultPeriod).pipe(
              takeUntil(this.destroy$))
          })
        )
      }),
      share())
  }
}


