import { Component, OnInit, OnDestroy, Signal, signal } from '@angular/core';
import { Observable, finalize, Subscription } from 'rxjs';
import { CurrentWeatherComponent } from 'src/app/shared/components/current-weather/current-weather.component';
import { DetailedWeatherTableComponent } from 'src/app/shared/components/detailed-weather-table/detailed-weather-table.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { WeatherCardComponent } from 'src/app/shared/components/weather-card/weather-card.component';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';
import { ILocation } from 'src/app/shared/models/location.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { IForecast } from 'src/app/shared/models/forecast.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [DetailedWeatherTableComponent, WeatherCardComponent, CurrentWeatherComponent, SearchComponent, ColumnComponent]
})
export class WeatherComponent implements OnInit, OnDestroy {


  subscriptions: Subscription[] = []

  searchResults$!: Observable<ILocation[]>
  searchResults: ILocation[] = []

  forecastIsLoading: boolean = false
  locationIsLoading: boolean = false
  forecast!: Signal<IForecast | undefined>


  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
  }

  getLocation(searchQuery: string): void{
    this.locationIsLoading = true;
    this.searchResults$ = this.locationService.getWeatherLocation(searchQuery).pipe(
      finalize(() => this.locationIsLoading = false)
    )
    this.subscriptions.push(this.searchResults$.subscribe((locations: ILocation[]) => {
      this.searchResults = locations
    }))
  }

  getForecast(location: ILocation): void {
    this.forecastIsLoading = true
    this.forecast = toSignal(this.weatherService.getForecast(location).pipe(
      finalize(() => this.forecastIsLoading = false)
    ))
  }

  clearForecast(): void {
    this.forecast = signal(undefined)
  }
  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

}
