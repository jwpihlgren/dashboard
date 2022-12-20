import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { mergeMap, Observable, forkJoin, of, tap, map, concatMap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensors$!: Observable<any>
  forecast$!: Observable<any>
  displayDetails: boolean = false
  interval!: any 

  constructor(
    private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService
  ){}

  ngOnInit(): void {
    this.sensors$ = this.sensorService.getSensors().pipe(
      map((sensor: any) => {
        sensor.warning = false
      })
    )
    
  this.updateWeather()
  this.interval = setInterval(() => {
    this.updateWeather();
  }, 10 * 60 * 1000)
  }

  ngOnDestroy(): void {
    this.sensorService.eventSourceDestory()
    clearInterval(this.interval)
  }

  updateWeather(): void {
    this.forecast$ = this.locationService.getUserFavoriteLocation().pipe(
      mergeMap((favoriteLocation: ILocation) => {
        return this.weatherService.getForecast(favoriteLocation).pipe(tap(data=>console.log(data)))
      })
    )
  }

  toggleDisplayDetails(){
    this.displayDetails = !this.displayDetails
  }

}


