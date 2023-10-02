import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IOceanographicalObservationsVersionResponse } from '../models/interfaces/smhi/oceanographical-observations-version-response';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { IOceanographicalObservationsParameterResponse } from '../models/interfaces/smhi/oceanographical-observations-parameter-response';
import { IOceanographicalObservationsStationResponse } from '../models/interfaces/smhi/oceanographical-observations-station-response';
import { IOceanographicalObservationsPeriodResponse } from '../models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsDataResponse } from '../models/interfaces/smhi/oceanographical-observations-data-response';

@Injectable({
  providedIn: 'root'
})
export class OceanographicalObservationsService {

  api = "https://opendata-download-ocobs.smhi.se/api"
  version = "version/1.0"
  fileType = ".json"

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService) { }

  getParameters(): Observable<IOceanographicalObservationsVersionResponse> {
    return this.http.get<IOceanographicalObservationsVersionResponse>(`${this.api}/${this.version}${this.fileType}`).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStations(url: string): Observable<IOceanographicalObservationsParameterResponse> {
    return this.http.get<IOceanographicalObservationsParameterResponse>(url).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getStation(url: string): Observable<IOceanographicalObservationsStationResponse> {
    return this.http.get<IOceanographicalObservationsStationResponse>(url).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getPeriod(url: string): Observable<IOceanographicalObservationsPeriodResponse> {
    return this.http.get<IOceanographicalObservationsPeriodResponse>(url).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }

  getData(url: string): Observable<IOceanographicalObservationsDataResponse> {
    return this.http.get<IOceanographicalObservationsDataResponse>(url).pipe(
      catchError(err => {
        console.log(err)
        return EMPTY
      }
    ) )
  }
}
