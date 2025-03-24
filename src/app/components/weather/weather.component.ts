import { Component, Signal, signal, inject } from '@angular/core';
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
import { SearchResultComponent } from 'src/app/shared/components/search-result/search-result.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [SearchResultComponent, DetailedWeatherTableComponent, WeatherCardComponent, CurrentWeatherComponent, SearchComponent, ColumnComponent]
})
export class WeatherComponent {

  searchResults: Signal<ILocation[] | undefined>
  forecast: Signal<IForecast | undefined>

  protected locationService: LocationService = inject(LocationService)
  protected weatherService: WeatherService = inject(WeatherService)

  constructor() {
    this.searchResults = toSignal(this.locationService.searchResults$)
    this.forecast = toSignal(this.weatherService.forecastResult$)
  }

  getLocation(searchQuery: string): void {
    this.locationService.find(searchQuery)
  }

  getForecast(location: ILocation): void {
    this.weatherService.forecastByLocation(location)
  }

  handleSearchClick(event: ILocation): void {
    this.weatherService.forecastByLocation(event)
  }
  clearSearch(): void {
    this.locationService.clear()
  }
  clearForecast(): void {
    this.weatherService.clearForecast()
  }



}

