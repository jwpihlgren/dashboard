import { SessionStorageService } from './session-storage.service';
import { ILocation } from './../models/location.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, timeout, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/weather-data.json'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private sessionStorageService:SessionStorageService
    ) { }

  getForecast(location: ILocation){

    const url = environment.dev.serverUrl
    const path = `/weather`
    const params = `?lat=${location.lat}&lon=${location.lon}`
    const hoursUntilExpire = 2
    const safeName = location.name.replace(" ", "")

    const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
    if(previousForecasts && previousForecasts[safeName] && !this.isExpired(previousForecasts[safeName].expireDate)) {
        return of(previousForecasts[safeName])
      }

    return this.http.get(`${url}${path}${params}`).pipe(
      timeout({
        each: 30 * 1000,
        with: () => {throw new Error("Request took to long to complete")}
      }),
      map((data:any) => {
        data.location = location.local_name
        data.fetchDate = new Date()
        data.expireDate = new Date(new Date().setHours(data.fetchDate.getHours() + hoursUntilExpire))
        const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
        previousForecasts[safeName] = data
        this.sessionStorageService.setStoredData("forecasts", previousForecasts)
        return data
      }),
      catchError(error => {
        alert(error)
        return of(error)
      })
    );
  }

  getIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}.png`
  }

  isExpired(expireDate: any): boolean {
    return expireDate <= new Date().toISOString()
  }
  
/*   getForecast(location: any){
    return of(dummydata)
  } */
}

