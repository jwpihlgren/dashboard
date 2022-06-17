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

  getForecast(location: any){
    const path = `/weather?lat=${location.lat}&lon=${location.lon}`
    return this.http.get(`${environment.dev.serverUrl}${path}`).pipe(
      map((data:any) => {
        data.forecast.fetchDate = data.fetchDate
        return data.forecast
      })
    );
  }
/*   getForecast(location: any){
    return of(dummydata)
  } */
}

