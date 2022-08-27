import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, finalize, Subscription } from 'rxjs';
import { ILocation } from 'src/app/shared/models/location.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {


  subscriptions: Subscription[] = []

  searchResults$!: Observable<ILocation[]>
  searchResults: ILocation[] = []

  forecastIsLoading: boolean = false
  locationIsLoading: boolean = false
  forecast$!: Observable<any>


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
    this.forecast$ = this.weatherService.getForecast(location).pipe(
      finalize(() => this.forecastIsLoading = false)
    )
  }
  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

}
