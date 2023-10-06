import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IOceanographicalObservationsVersionResponse } from '../models/interfaces/smhi/oceanographical-observations-version-response';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { IOceanographicalObservationsParameterResponse } from '../models/interfaces/smhi/oceanographical-observations-parameter-response';
import { IOceanographicalObservationsStationResponse } from '../models/interfaces/smhi/oceanographical-observations-station-response';
import { IOceanographicalObservationsPeriodResponse } from '../models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsDataResponse } from '../models/interfaces/smhi/oceanographical-observations-data-response';
import { ISMHIObservationsFileType } from '../models/smhi-observations-file-type';

@Injectable({
  providedIn: 'root'
})
export class OceanographicalObservationsService {

  API = "https://opendata-download-ocobs.smhi.se/api"
  VERSION = "version/1.0"
  MEDIA_TYPE = ".json"
  APPLICATION_TYPE = "application/json"
  BAD_PERIODS = ["corrected-archive"]

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService,
    ) { }

  getParameters(): Observable<IOceanographicalObservationsVersionResponse> {
    return this.http.get<IOceanographicalObservationsVersionResponse>(`${this.API}/${this.VERSION}${this.MEDIA_TYPE}`).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStations(parameterId: string): Observable<IOceanographicalObservationsParameterResponse> {
    const parameter = `parameter/${parameterId}`
    return this.http.get<IOceanographicalObservationsParameterResponse>(`${this.API}/${this.VERSION}/${parameter}${this.MEDIA_TYPE}`).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStation(parameterId: string, stationId: number): Observable<IOceanographicalObservationsStationResponse> {
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    return this.http.get<IOceanographicalObservationsStationResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}${this.MEDIA_TYPE}`).pipe(
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

  getPeriod(parameterId: string, stationId: number, periodName: string): Observable<IOceanographicalObservationsPeriodResponse> {
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    const period = `period/${periodName}`
    const thisStation = `${stationId}-${periodName}`
    return this.http.get<IOceanographicalObservationsPeriodResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}/${period}${this.MEDIA_TYPE}`).pipe(
      map(data => {
        const previousData = this.localStorageService.getStoredData("oceanographicalPeriods") as {[key: string]: IOceanographicalObservationsPeriodResponse };
        this.localStorageService.setStoredData("oceanographicalPeriods", {...previousData, [thisStation]: data})
        return data
        
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getPeriodData(parameterId: string, stationId: number, periodName: string): Observable<IOceanographicalObservationsDataResponse> {    
    const parameter = `parameter/${parameterId}`
    const station = `station/${stationId}`
    const period = `period/${periodName}`
    const data = `data`
    const thisStation = `${stationId}-${periodName}`

    const previousPeriods: any = this.localStorageService.getStoredData("oceanographicalPeriods");
    const previousDatas: any = this.localStorageService.getStoredData("oceanographicalData");
    const previousPeriod: IOceanographicalObservationsPeriodResponse  = previousPeriods[thisStation] as IOceanographicalObservationsPeriodResponse
    const previousData: IOceanographicalObservationsDataResponse = previousDatas[thisStation] as IOceanographicalObservationsDataResponse

    console.log(previousPeriods, previousData);
    if(previousPeriod && previousData && previousPeriod.data[0].updated === previousData.updated ) {
      console.log("Using stored data")
      return of(previousData)
    }
    console.log("No stored data")
    return this.http.get<IOceanographicalObservationsDataResponse>(`${this.API}/${this.VERSION}/${parameter}/${station}/${period}/${data}${this.MEDIA_TYPE}`)
    .pipe(
      map(data => {
        let storedData: any = this.localStorageService.getStoredData("oceanographicalData");
        storedData[thisStation] = data
        this.localStorageService.setStoredData("oceanographicalData", {...storedData, [thisStation]:  data})
        return data

      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  private getLinkByMediaType(links: ISMHIObservationsFileType[]): string {
    return links.find(link => link.type === this.APPLICATION_TYPE)?.href as string
  }


  
}
