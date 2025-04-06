import { Component, Signal, signal, inject, WritableSignal } from '@angular/core';
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
import { UserMetadata, UserService } from 'src/app/shared/services/user.service';
import { finalize, first, switchMap } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [SearchResultComponent, DetailedWeatherTableComponent, WeatherCardComponent, CurrentWeatherComponent, SearchComponent, ColumnComponent]
})
export class WeatherComponent {

  searchResults: Signal<ILocation[] | undefined>
  forecast: Signal<IForecast | undefined>
  location: Signal<ILocation | undefined> = signal(undefined)

  protected locationService: LocationService = inject(LocationService)
  protected weatherService: WeatherService = inject(WeatherService)
  protected userService: UserService = inject(UserService)

  metadata: Signal<UserMetadata | undefined> = signal(undefined)
  id: string | undefined

  loading = "loading"
  useAsDefault = "Använd som standard"
  setDefaultButtonText: WritableSignal<string> = signal<string>(this.useAsDefault)

  constructor() {
    this.searchResults = toSignal(this.locationService.searchResults$)
    this.forecast = toSignal(this.weatherService.forecastResult$)
    this.metadata = toSignal(this.userService.getUser().pipe(
      switchMap(user => {
        this.id = user?.sub
        return this.userService.getUserMetadata(user?.sub!)
      })
    ))

  }

  getLocation(searchQuery: string): void {
    this.locationService.find(searchQuery)
  }

  getForecast(location: ILocation): void {
    this.weatherService.forecastByLocation(location)
    this.location = signal(location)
  }

  handleSearchClick(event: ILocation): void {
    this.getForecast(event)
  }

  clearSearch(): void {
    this.locationService.clear()
  }

  clearForecast(): void {
    this.weatherService.clearForecast()
    this.location = signal(undefined)
  }

  setDefault(location: ILocation | undefined): void {
    if (this.id && this.metadata() !== undefined) {
      if (location) {
        this.setDefaultButtonText.set(this.loading)
        this.userService.setUserFavoriteWeatherForecastLocation(this.id, this.metadata()!, location).pipe(
          finalize(() => this.setDefaultButtonText.set(this.useAsDefault)),
          first()
        ).subscribe()
      }
    }
  }
}

