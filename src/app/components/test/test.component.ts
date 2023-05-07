import { LocationService } from './../../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { IForecast } from 'src/app/shared/models/forecast.interface';
import { ILocation } from 'src/app/shared/models/location.interface';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  forecast$!: Observable<IForecast>

  constructor(private locationService: LocationService,private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.forecast$ = this.locationService.getUserFavoriteLocation().pipe(
      mergeMap((favoriteLocation: ILocation) => {
        return this.weatherService.getForecast(favoriteLocation).pipe()
      })
    )
  }

}
