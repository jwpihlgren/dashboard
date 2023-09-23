import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { mergeMap, Observable, forkJoin, of, tap, map, concatMap, ReplaySubject, takeUntil, share, interval, switchMap, timer, take } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location.interface';
import { ISensor } from 'src/app/shared/models/sensor.interface';
import { IForecast } from 'src/app/shared/models/forecast.interface';
import { PingService } from 'src/app/shared/services/ping.service';
import { ISMHIHydrologicalStationWaterLevelData } from 'src/app/shared/models/smhi-hydrological-station-water-level-data';
import { WaterLevelService } from 'src/app/shared/services/water-level.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  defaultStation = 154 //motala


  sensors$!: Observable<ISensor[]>
  forecast$!: Observable<IForecast>
  stationWaterLevelData$!: Observable<ISMHIHydrologicalStationWaterLevelData>
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1)

  constructor(
    private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private waterLevelService: WaterLevelService,
    private pingService: PingService
  ){}

  ngOnInit(): void {

    this.sensors$ = this.sensorService.getSensors()
    this.forecast$ = this.getForecast()
    this.stationWaterLevelData$ = this.waterLevelService.getWaterLevel(this.defaultStation)
    this.pingService.ping().pipe(
      takeUntil(this.destroy$)).subscribe()
  }

  ngOnDestroy(): void {
    this.sensorService.eventSourceDestory()
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
}


