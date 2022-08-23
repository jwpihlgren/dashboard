import { ILocation } from './../models/location.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/weather-data.json'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(location: ILocation){
    
    const url = environment.dev.serverUrl
    const path = `/weather`
    const params = `?lat=${location.lat}&lon=${location.lon}`

    return this.http.get(`${url}${path}${params}`).pipe(
      map((data:any) => {
        data.forecast.fetchDate = data.fetchDate
        data.forecast.location = location.local_name
        return data.forecast
      })
    );
  }

  getIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}.png`
  }
  
/*   getForecast(location: any){
    return of(dummydata)
  } */
}

