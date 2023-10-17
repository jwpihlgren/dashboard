import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { IHydrologicalObservationsDataResponse } from '../models/interfaces/smhi/hydrological-observations-data-response ';
import { IHydrologicalObservationsParameterResponse } from '../models/interfaces/smhi/hydrological-observations-parameter-response ';
import { IHydrologicalObservationsPeriodResponse } from '../models/interfaces/smhi/hydrological-observations-period-response ';
import { IHydrologicalObservationsStationResponse } from '../models/interfaces/smhi/hydrological-observations-station-response ';
import { IHydrologicalObservationsVersionResponse } from '../models/interfaces/smhi/hydrological-observations-version-response ';

@Injectable({
  providedIn: 'root'
})
export class HydrologicalObservationsService {

  API = "https://opendata-download-ocobs.smhi.se/api"
  VERSION = "version/1.0"
  MEDIA_TYPE = ".json"
  APPLICATION_TYPE = "application/json"
  BAD_PERIODS = ["corrected-archive"]

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService,
    ) { }

  getParameters(): Observable<IHydrologicalObservationsVersionResponse> {
    return this.http.get<IHydrologicalObservationsVersionResponse>(`${this.API}/${this.VERSION}${this.MEDIA_TYPE}`).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStations(parameterId: string): Observable<IHydrologicalObservationsParameterResponse> {
    const parameter = `parameter/${parameterId}`
    return this.http.get<IHydrologicalObservationsParameterResponse>(`${this.API}/${this.VERSION}/${parameter}${this.MEDIA_TYPE}`).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStation(parameterId: string, stationId: number): Observable<IHydrologicalObservationsStationResponse> {
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    return this.http.get<IHydrologicalObservationsStationResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}${this.MEDIA_TYPE}`).pipe(
      map(data => {
        const filteredPeriod = data.period.filter(period => !this.BAD_PERIODS.includes(period.key))
        data.period = filteredPeriod
        return data
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getPeriod(parameterId: string, stationId: number, periodName: string): Observable<IHydrologicalObservationsPeriodResponse> {
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    const period = `period/${periodName}`
    const thisStation = `${parameterId}-${stationId}-${periodName}`
    return this.http.get<IHydrologicalObservationsPeriodResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}/${period}${this.MEDIA_TYPE}`).pipe(
      map(data => {
        const previousData = this.localStorageService.getStoredData("hydrologicalPeriods") as {[key: string]: IHydrologicalObservationsPeriodResponse };
        this.localStorageService.setStoredData("hydrologicalPeriods", {...previousData, [thisStation]: data})
        return data
        
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getPeriodData(parameterId: string, stationId: number, periodName: string): Observable<IHydrologicalObservationsDataResponse> {    
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    const period = `period/${periodName}`
    const data = `data`
    const thisStation = `${parameterId}-${stationId}-${periodName}`
    
    const previousPeriods: any = this.localStorageService.getStoredData("hydrologicalPeriods");
    const previousDatas: any = this.localStorageService.getStoredData("hydrologicalData");
    const previousPeriod: IHydrologicalObservationsPeriodResponse  = previousPeriods[thisStation] as IHydrologicalObservationsPeriodResponse
    const previousData: IHydrologicalObservationsDataResponse = previousDatas[thisStation] as IHydrologicalObservationsDataResponse

    if(previousPeriod && previousData && previousPeriod.data[0].updated === previousData.updated ) {
      console.log("Using stored data")
      return of(previousData)
    }
    console.log("No stored data")
    return this.http.get<IHydrologicalObservationsDataResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}/${period}/${data}${this.MEDIA_TYPE}`)
    .pipe(
      map(data => {
        let storedData: any = this.localStorageService.getStoredData("hydrologicalData");
        storedData[thisStation] = data
        this.localStorageService.setStoredData("hydrologicalData", {...storedData, [thisStation]:  data})
        return data

      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }
  
}
