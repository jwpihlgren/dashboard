import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { mergeMap, Observable, forkJoin, of, tap, map, concatMap, ReplaySubject, takeUntil, share } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location.interface';
import { ISensor } from 'src/app/shared/models/sensor.interface';
import { IForecast } from 'src/app/shared/models/forecast.interface';
import { PingService } from 'src/app/shared/services/ping.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensors$!: Observable<ISensor[]>
  forecast$!: Observable<IForecast>
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1)

  constructor(
    private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private pingService: PingService
  ){}

  ngOnInit(): void {

    this.sensors$ = this.sensorService.getSensors()
    this.forecast$ = this.getWeather()
    this.pingService.ping().pipe(
      takeUntil(this.destroy$)).subscribe()
  }

  ngOnDestroy(): void {
    this.sensorService.eventSourceDestory()
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  getWeather(): Observable<IForecast> {
    return this.locationService.getUserFavoriteLocation().pipe(
      mergeMap((favoriteLocation: ILocation) => {
        return this.weatherService.getForecast(favoriteLocation)
      }),
      share()
    )
  }
}


