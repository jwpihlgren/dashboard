import { OceanographicalObservationsService } from './../../shared/services/oceanographical-observations.service';
import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { first, map, Observable, share, switchMap, tap, timer } from 'rxjs';
import { Component, signal, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IForecast } from 'src/app/shared/models/forecast.interface';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { IThresholdConfig } from 'src/app/shared/models/interfaces/threshold-config';
import { IPollenForecast } from 'src/app/shared/models/interfaces/pollenrapporten/pollen-forecast';
import { PollenService } from 'src/app/shared/services/pollen.service';
import { DetailedWeatherTableComponent } from 'src/app/shared/components/detailed-weather-table/detailed-weather-table.component';
import { SimpleWaterLevelComponent } from 'src/app/shared/components/simple-water-level/simple-water-level.component';
import { PollenForecastComponent } from 'src/app/shared/components/pollen-forecast/pollen-forecast.component';
import { WeatherCardComponent } from 'src/app/shared/components/weather-card/weather-card.component';
import { CurrentWeatherComponent } from 'src/app/shared/components/current-weather/current-weather.component';
import { MasonryGridComponent } from 'src/app/shared/layouts/masonry-grid/masonry-grid.component';
import { UserMetadata, UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [DetailedWeatherTableComponent, SimpleWaterLevelComponent, PollenForecastComponent, WeatherCardComponent, CurrentWeatherComponent, MasonryGridComponent]
})
export class DashboardComponent {
  defaultStation = 35101 //Juten sjöv
  defaultParameter = "13" // Havsvattenstånd, minutvärde
  defaultPeriod = "latest-day" // latest-day | latest-hour
  thresholdConfig: IThresholdConfig = {
    thresholdColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholdsAsUnits: [20, 80, 0]
  }

  //This changes often
  forecast: Signal<IForecast | undefined> = signal(undefined)
  stationWaterLevelData: Signal<IOceanographicalObservationsDataResponse | undefined> = signal(undefined)
  pollenForecast: Signal<IPollenForecast | undefined> = signal(undefined)
  userMetaData: Signal<UserMetadata | undefined> = signal(undefined)
  id: string | undefined = undefined
  timer: Signal<any>
  pollenForecastPeriod: Date


  protected locationService: LocationService = inject(LocationService)
  protected weatherService: WeatherService = inject(WeatherService)
  protected oceanographicalObservationsService: OceanographicalObservationsService = inject(OceanographicalObservationsService)
  protected pollenService: PollenService = inject(PollenService)
  protected userService: UserService = inject(UserService)


  constructor() {
    this.forecast = toSignal(this.weatherService.forecastResult$)
    this.stationWaterLevelData = toSignal(this.getPeriodData())
    this.pollenForecast = toSignal(this.pollenService.pollenForecast$)
    this.timer = toSignal(this.getTimer())
    this.pollenForecastPeriod = new Date()
    this.userMetaData = toSignal(this.userService.getUser().pipe(
      switchMap(user => {
        this.id = user?.sub
        return this.userService.getUserMetadata(user?.sub!).pipe(
          map(metadata => {
            this.queryObservables(metadata)
            return metadata
          })
        )
      })
    ))
  }

  updatePollenData(data: { regionId: string, date: Date }): void {
    this.pollenService.pollenForecastById(data.regionId, data.date)
  }

  getTimer(): Observable<number> {
    const delay = 1000 * 60 * 60 * 0.5
    const interval = 1000 * 60 * 60 * 0.5


    return timer(delay, interval).pipe(
      tap(() => {
        if (this.userMetaData()) {
          this.queryObservables(this.userMetaData()!)
        }
      })
    )
  }

  queryObservables(metadata: UserMetadata): void {
    const weatherLocation = metadata.favorite.weatherForecastLocation
    const pollenLocation = metadata.favorite.pollenForecastLocation
    if (weatherLocation) this.weatherService.forecastByLocation(weatherLocation)
    if (pollenLocation) this.pollenService.pollenForecastByName(pollenLocation.name, this.pollenForecastPeriod)

  }

  getPeriodData(): Observable<IOceanographicalObservationsDataResponse> {
    const delay = 0;
    const everyTwoHours = 1000 * 60 * 60 * 0.5

    return timer(delay, everyTwoHours).pipe(
      switchMap(() => {
        return this.oceanographicalObservationsService.getPeriod(this.defaultParameter, this.defaultStation, this.defaultPeriod).pipe(
          switchMap(() => {
            return this.oceanographicalObservationsService.getPeriodData(this.defaultParameter, this.defaultStation, this.defaultPeriod).pipe(
              share())
          }))
      }))
  }
}



