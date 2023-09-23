import { ISMHIHydrologicalStationWithPeriods } from './../models/smhi-hydrological-station-with-periods';
import { ISMHIHydrologicalBase } from './../models/smhi-hydrological-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, catchError, EMPTY, mergeMap, forkJoin, filter, of,} from 'rxjs';
import { ISMHIHydrologicalStationWaterLevelData } from '../models/smhi-detailed-water-level';
import * as dummydata from '../../../assets/stubs/hydrological-value.json'

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {

  constructor(private http: HttpClient) { }

  base = "https://opendata-download-hydroobs.smhi.se/api/"
  version = "version/1.0/"
  fileType = ".json"


  getHydrologicalStations(): Observable<ISMHIHydrologicalStationWithPeriods[]> {
    const waterLevelParameter = "parameter/3"
    return this.http.get<ISMHIHydrologicalBase>(`${this.base}${this.version}${waterLevelParameter}${this.fileType}`).pipe(
      mergeMap(hydrologicalBaseData => {
        const stations: Observable<ISMHIHydrologicalStationWithPeriods>[] = hydrologicalBaseData.station.map(station => {
          const stationDataURLForJson = station.link[0].href
          return this.http.get<ISMHIHydrologicalStationWithPeriods>(stationDataURLForJson).pipe(
            filter(data => {
              console.log(data)
              return data.period.find( station => station.key === "corrected-archive") ? true : false
            }),
          )
        })
        return forkJoin(stations)
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      })
    )
  }
  
  getWaterLevel(id: number): Observable<ISMHIHydrologicalStationWaterLevelData> {
    const period = "period/corrected-archive/"
    const waterLevelParameter = "parameter/3/"
    const station = `station/${id}/`
    const data = "data"
    return of(dummydata as ISMHIHydrologicalStationWaterLevelData)
  }

/*   getWaterLevel(id: number): Observable<ISMHIHydrologicalStationWaterLevelData> {
    const period = "period/corrected-archive/"
    const waterLevelParameter = "parameter/3/"
    const station = `station/${id}/`
    const data = "data"
    return this.http.get<ISMHIHydrologicalStationWaterLevelData>(`${this.base}${this.version}${waterLevelParameter}${station}${period}${data}${this.fileType}`).pipe(
      tap(data => console.log(data)),
      catchError(err => {
        console.log(err)
        return EMPTY
      })
    )
  } */

}

