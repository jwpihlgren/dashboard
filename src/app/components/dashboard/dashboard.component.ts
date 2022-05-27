import { WeatherService } from './../../shared/services/weather.service';
import { LocationService } from './../../shared/services/location.service';
import { SensorService } from './../../shared/services/sensor.service';
import { mergeMap, Observable, switchMap, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sensors$!: Observable<any>
  forecast$!: Observable<any>

  constructor(
    private sensorService: SensorService,
    private locationService: LocationService,
    private weatherService: WeatherService
  ){}

  ngOnInit(): void {
    this.sensors$ = this.sensorService.getSensors()
    this.forecast$ = this.locationService.getWeatherLocation('partille').pipe(
      mergeMap((locations: any) => {
        const location = {lat: locations[0].lat, lon: locations[0].lon}
        return this.weatherService.getForecast(location)
      })
    )
  }
}


