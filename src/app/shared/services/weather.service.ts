import { SessionStorageService } from './session-storage.service';
import { ILocation } from './../models/location.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, timeout, catchError, retry, EMPTY, Observable, forkJoin, shareReplay, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/weather-data.json'
import { IForecastResponse } from '../models/forecast-response.interface';
import { IForecast } from '../models/forecast.interface';
import { IinsideTemperatureResponse } from '../models/inside-temperature-response.interface';



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
    const minutesuntilExpire = 10
    const safeName = location.name.replace(" ", "")

    const previousForecasts: any = this.sessionStorageService.getStoredData("forecasts")
    if(previousForecasts && previousForecasts[safeName] && !this.isExpired(previousForecasts[safeName].expireDate)) {
        return of(previousForecasts[safeName]) as Observable<IForecast>
      }
    const forecastRequest: Observable<IForecastResponse> = this.http.get<IForecastResponse>(`${url}${path}${params}`)
    const insideTemperatureRequest: Observable<IinsideTemperatureResponse> = this.http.get<any>(`${url}/sensors/temperature`)

  return forkJoin({
      forecast: forecastRequest,
      insideTemperature: insideTemperatureRequest
    }).pipe(
      timeout({
        each: 30 * 1000,
        with: () => {throw new Error("Request took too long to complete")}
      }),
      map((data: any): IForecast => {
        const currentDate = new Date()
        const parsedData: IForecast = {
          
          insideTemperature: Math.floor(data.insideTemperature.temperature),
          locationName: location.local_name,
          fetchDate: currentDate,
          expireDate: new Date(new Date().setHours(currentDate.getHours() + hoursUntilExpire)),
      /* expireDate: new Date(new Date().setMinutes(currentDate.getMinutes() + minutesuntilExpire)), */
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

  /* Write a function that returns a forecast with all parameters randomized */
  getForecast2(location: ILocation): Observable<IForecast> {
    /* Create a const of type IForecast with all parameters randomized */
    const randomForecast: IForecast = {
      locationName: "Random",
      fetchDate: new Date(),
      expireDate: new Date(),
      insideTemperature: Math.floor(Math.random() * 30),
      updatedAt: new Date(),
      current: {
        apparentTemperature: Math.floor(Math.random() * 30),
        currentTemperature: Math.floor(Math.random() * 30),
        maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
        minAmountOfPrecipitation: Math.floor(Math.random() * 30),
        airPressure: Math.floor(Math.random() * 1100),
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 30),
        windDirection: Math.floor(Math.random() * 360),
        precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        windGust: Math.floor(Math.random() * 30),
      },
      hourly: [
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },
        {
          symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
          precipitationType: Math.floor(Math.random() * 6) as 0 | 1 | 2 | 3 | 4 | 5,
          apparentTemperature: Math.floor(Math.random() * 30),
          cloudiness: Math.floor(Math.random() * 100),
          maxAmountOfPrecipitation: Math.floor(Math.random() * 30),
          minAmountOfPrecipitation: Math.floor(Math.random() * 30),
          currentTemperature: Math.floor(Math.random() * 30),
          UVI: Math.floor(Math.random() * 10),
          validTime: new Date(),
        },],
      daily: [{
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime:new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      },
      {
        symbol: Math.floor(Math.random() * 11) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
        maxTemperature: Math.floor(Math.random() * 30),
        minTemperature: Math.floor(Math.random() * 30),
        validTime: new Date(new Date().setHours(Math.floor(Math.random() * 30))),
      }],
    }
    return of(randomForecast)
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

function forkjoin(arg0: Observable<IForecast>): Observable<IForecast> {
  throw new Error('Function not implemented.');
}

