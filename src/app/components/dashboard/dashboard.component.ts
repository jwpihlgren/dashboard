import { OceanographicalObservationsService } from './../../shared/services/oceanographical-observations.service';
import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { Observable, share, switchMap, tap, timer } from 'rxjs';
import { Component, signal, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ILocation } from 'src/app/shared/models/location.interface';
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
  REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a303a3234"

  forecast: Signal<IForecast | undefined> = signal(undefined)
  stationWaterLevelData: Signal<IOceanographicalObservationsDataResponse | undefined> = signal(undefined)
  pollenForecast: Signal<IPollenForecast | undefined> = signal(undefined)
  favoriteLocation: Signal<ILocation | undefined>
  timer: Signal<any>

  protected locationService: LocationService = inject(LocationService)
  protected weatherService: WeatherService = inject(WeatherService)
  protected oceanographicalObservationsService: OceanographicalObservationsService = inject(OceanographicalObservationsService)
  protected pollenService: PollenService = inject(PollenService)


  constructor() {
    this.forecast = toSignal(this.weatherService.forecastResult$)
    this.stationWaterLevelData = toSignal(this.getPeriodData())
    this.pollenForecast = toSignal(this.getPollenForecast(this.REGION))
    this.favoriteLocation = toSignal(this.locationService.getUserFavoriteLocation().pipe(
      tap(location => {
        this.weatherService.forecastByLocation(location)
      })
    ))
    this.timer = toSignal(this.getTimer())
  }

  updatePollenData(data: { regionId: string, date?: Date }): void {
    this.pollenService.queryDetailedForecast(data.regionId, data.date)
  }

  getPollenForecast(regionId: string): Observable<IPollenForecast> {
    const frequency = 1000 * 60 * 60 * 8;
    const delay = 0;
    return timer(delay, frequency).pipe(
      switchMap(() => {
        this.updatePollenData({ regionId: regionId })
        return this.pollenService.getDetailedForecast$(regionId)
      })
    )
  }

  getTimer(): Observable<number> {
    const delay = 1000 * 60 * 60 * 0.5
    const interval = 1000 * 60 * 60 * 0.5


    return timer(delay, interval).pipe(
      tap(() => {
        if (this.favoriteLocation()) {
          this.weatherService.forecastByLocation(this.favoriteLocation()!)
        }
      })
    )
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



