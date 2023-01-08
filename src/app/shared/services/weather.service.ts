import { SessionStorageService } from './session-storage.service';
import { ILocation } from './../models/location.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, timeout, catchError, retry, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/weather-data.json'
import { IForecastResponse } from '../models/forecast-response.interface';
import { IForecast } from '../models/forecast.interface';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private sessionStorageService:SessionStorageService
    ) { }

  getForecast(location: ILocation): Observable<IForecast>{

    const url = environment.dev.serverUrl
    const path = `/weather`
    const params = `?lat=${location.lat}&lon=${location.lon}`
    const hoursUntilExpire = 2
    const safeName = location.name.replace(" ", "")

    const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
    if(previousForecasts && previousForecasts[safeName] && !this.isExpired(previousForecasts[safeName].expireDate)) {
        return of(previousForecasts[safeName]) as Observable<IForecast>
      }

    return this.http.get<IForecastResponse>(`${url}${path}${params}`).pipe(
      timeout({
        each: 30 * 1000,
        with: () => {throw new Error("Request took too long to complete")}
      }),
      map((data:IForecastResponse): IForecast => {

        const currentDate = new Date()
        const parsedData: IForecast = {
          locationName: location.local_name,
          fetchDate: currentDate,
          expireDate: new Date(new Date().setHours(currentDate.getHours() + hoursUntilExpire)),
          ...data
        }

        const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
        previousForecasts[safeName] = parsedData
        this.sessionStorageService.setStoredData("forecasts", previousForecasts)
        return parsedData
      }),
      retry(3),
      catchError(error => {
        console.log(error);
        return EMPTY
      })
    );
  }

  getIconUrl(icon: number) {
    const icons: any = {
      1: "sun",
      2: "cloud-sun",
      3: "clouds-sun",
      4: "clouds-sun",
      5: "clouds",
      6: "cloud",
      7: "cloud-fog",
      8: "cloud-drizzle-sun",
      9: "cloud-drizzle",
      10: "cloud-drizzle",
      11: "cloud-rain-lightning",
      12: "cloud-hail",
      13: "cloud-hail",
      14: "cloud-hail",
      15: "cloud-snow",
      16: "cloud-snow",
      17: "cloud-snow",
      18: "cloud-rain-2",
      19: "cloud-rain",
      20: "cloud-rain",
      21: "cloud-lightning",
      22: "cloud-hail",
      23: "cloud-hail",
      24: "cloud-hail",
      25: "cloud-snow",
      26: "cloud-snow",
      27: "cloud-snow",
    }
    return `assets/sprites/weather-icons.svg#${icons[icon]}`
  }

  isExpired(expireDate: any): boolean {
    return expireDate <= new Date().toISOString()
  }



  
/*   getForecast(location: any){
    return of(dummydata)
  } */
}

