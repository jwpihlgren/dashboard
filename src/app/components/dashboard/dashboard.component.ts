import { OceanographicalObservationsService } from './../../shared/services/oceanographical-observations.service';
import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { Observable, ReplaySubject, takeUntil, share, switchMap, timer } from 'rxjs';
import { Component, OnInit, OnDestroy, KeyValueDiffer } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy {
  defaultStation = 35101 //Juten sjöv
  defaultParameter = "13" // Havsvattenstånd, minutvärde
  defaultPeriod = "latest-day" // latest-day | latest-hour
  thresholdConfig: IThresholdConfig = {
    thresholdColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholdsAsUnits: [20, 80, 0]
  }

  REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a303a3234"
  //REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38"
  // REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a32"

  //  sensors$!: Observable<ISensor[]>
  forecast$!: Observable<IForecast>
  stationWaterLevelData$!: Observable<IOceanographicalObservationsDataResponse>
  pollenForecast$!: Observable<IPollenForecast>
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1)

  differ!: KeyValueDiffer<any, any>
  constructor(
    //   private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private pollenService: PollenService,
  ) {
  }

  ngOnInit(): void {

    //   this.sensors$ = this.sensorService.getSensors()
    this.forecast$ = this.getForecast()
    this.stationWaterLevelData$ = this.getPeriodData()
    this.pollenForecast$ = this.getPollenForecast(this.REGION)
  }

  ngOnDestroy(): void {
    //    this.sensorService.eventSourceDestory()
    this.destroy$.next(true)
    this.destroy$.complete()
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


