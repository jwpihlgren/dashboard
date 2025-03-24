import { SessionStorageService } from './session-storage.service';
import { ILocation } from './../models/location.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of, timeout, catchError, retry, EMPTY, Observable, forkJoin, shareReplay, share, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/weather-data.json'
import { IForecastResponse } from '../models/forecast-response.interface';
import { IForecast } from '../models/forecast.interface';
import { IinsideTemperatureResponse } from '../models/inside-temperature-response.interface';
import UrlBuilder from '../utils/url-builder';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  protected http: HttpClient = inject(HttpClient)
  protected sessionStorageService: SessionStorageService = inject(SessionStorageService)

  forecast_: Subject<ILocation | undefined> = new Subject()
  forecastResult$: Observable<IForecast | undefined>

  constructor() {
    this.forecastResult$ = this.forecast_.pipe(
      switchMap(location => {
        if(location === undefined) return of(undefined)
        return this.request(location)
      })
    )
  }


  forecastByLocation(location: ILocation): void {
    this.forecast_.next(location)
  }
  clearForecast(): void {
    this.forecast_.next(undefined)
  }

  private request(location: ILocation): Observable<IForecast> {
    const forecastUrl = (new UrlBuilder(environment.dev.serverUrl, "weather"))
      .addQueryParam("lat", location.lat.toString())
      .addQueryParam("lon", location.lon.toString())
      .url

    const insideTemperatureUrl = (new UrlBuilder(environment.dev.serverUrl, "hass/temperature-sensors"))
      .url
    const hoursUntilExpire = 2
    const minutesuntilExpire = 10
    const safeName = location.name.replace(" ", "")

    const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
    if (previousForecasts && previousForecasts[safeName] && !this.isExpired(previousForecasts[safeName].expireDate)) {
      return of(previousForecasts[safeName]) as Observable<IForecast>
    }
    const forecastRequest: Observable<IForecastResponse> = this.http.get<IForecastResponse>(forecastUrl)
    const insideTemperatureRequest: Observable<IinsideTemperatureResponse> = this.http.get<IinsideTemperatureResponse>(insideTemperatureUrl)

    return forkJoin({
      forecast: forecastRequest,
      insideTemperature: insideTemperatureRequest,
      previousForecast: of((previousForecasts && previousForecasts[safeName] ? previousForecasts[safeName] : undefined))
    }).pipe(
      timeout({
        each: 30 * 1000,
        with: () => { throw new Error("Request took too long to complete") }
      }),
      map((data: any): IForecast => {
        const currentDate = new Date()
        const parsedData: IForecast = {
          insideTemperature: Math.floor(data.insideTemperature.data.temperature),
          locationName: location.local_name,
          fetchDate: currentDate,
          expireDate: new Date(new Date().setHours(currentDate.getHours() + hoursUntilExpire)),
          /* expireDate: new Date(new Date().setMinutes(currentDate.getMinutes() + minutesuntilExpire)), */ // Enable for testing purposes
          airPressureChange: this.getAirPressureChangeIndication(data.previousForecast?.current.airPressure, data.forecast.current.airPressure),
          /* airPressureChange: 1, */ //Enable for testing purposes
          ...data.forecast
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
      }),
      shareReplay(1),
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

  getAirPressureChangeIndication(previousAirPressure: number | undefined, currentAirPressure: number): -1 | 0 | 1 {
    if (!previousAirPressure) {
      return 0
    }
    if (previousAirPressure < currentAirPressure) {
      return 1
    }
    if (previousAirPressure > currentAirPressure) {
      return -1
    }
    return 0
  }




  /*   getForecast(location: any){
      return of(dummydata)
    } */
}

function forkjoin(arg0: Observable<IForecast>): Observable<IForecast> {
  throw new Error('Function not implemented.');
}

