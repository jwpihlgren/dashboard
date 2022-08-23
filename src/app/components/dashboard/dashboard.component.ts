import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { mergeMap, Observable, forkJoin } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation } from 'src/app/shared/models/location.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensor$!: Observable<any>
  forecast$!: Observable<any>
  displayDetails: boolean = false
  interval!: any 

  constructor(
    private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService
  ){}

  ngOnInit(): void {
    this.sensor$ = forkJoin(
      {
        sensors: this.sensorService.getSensors(),
        token : this.sensorService.getToken()
      }
    ).pipe(
      mergeMap((data: any) => {
        return this.sensorService.getSensor(data.sensors.response[0]._id, data.token)
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
        return this.weatherService.getForecast(favoriteLocation)
      })
    )
  }

  toggleDisplayDetails(){
    this.displayDetails = !this.displayDetails
  }

}


