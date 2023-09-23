import { LocalStorageService } from './local-storage.service';
import { ISMHIHydrologicalStation } from '../models/smhi-hydrological-station';
import { ISMHIHydrologicalParameter } from '../models/smhi-hydrological-parameter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, catchError, EMPTY, mergeMap, forkJoin, filter, of, pipe, map,} from 'rxjs';
import { ISMHIHydrologicalStationWaterLevelData } from '../models/smhi-hydrological-station-water-level-data';
import * as dummydata from '../../../assets/stubs/hydrological-value.json'
import { ISMHIHydrologicalStationWaterLevelMeta } from '../models/smhi-hydrological-station-water-level-meta';

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService) { }

  api = "https://opendata-download-hydroobs.smhi.se/api/"
  version = "version/1.0/"
  fileType = ".json"


  getHydrologicalStations(): Observable<ISMHIHydrologicalStation[]> {
    const waterLevelParameter = "parameter/3"
    return this.http.get<ISMHIHydrologicalParameter>(`${this.api}${this.version}${waterLevelParameter}${this.fileType}`).pipe(
      mergeMap(hydrologicalBaseData => {
        const stations: Observable<ISMHIHydrologicalStation>[] = hydrologicalBaseData.station.map(station => {
          const stationDataURLForJson = station.link[0].href
          return this.http.get<ISMHIHydrologicalStation>(stationDataURLForJson).pipe(
            filter(data => {
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
  
  getWaterLevel2(id: number): Observable<ISMHIHydrologicalStationWaterLevelData> {
    const period = "period/corrected-archive/"
    const waterLevelParameter = "parameter/3/"
    const station = `station/${id}/`
    const data = "data"
    return of(dummydata as ISMHIHydrologicalStationWaterLevelData)
  }

  getWaterLevel(id: number): Observable<ISMHIHydrologicalStationWaterLevelData> {
    const period = "period/corrected-archive"
    const waterLevelParameter = "parameter/3/"
    const station = `station/${id}/`
    const data = "data"
    return this.http.get<ISMHIHydrologicalStationWaterLevelMeta>(`${this.api}${this.version}${waterLevelParameter}${station}${period}${this.fileType}`).pipe(
      mergeMap(hydrologicalStationData => {
        const previousData = this.localStorageService.getStoredData("hydrologicaldata") as {[key: string]: ISMHIHydrologicalStationWaterLevelData};
        if(previousData && previousData[id] && previousData[id].updated === hydrologicalStationData.data[0].updated  ) {
          console.log("Using stored data")
          return of(previousData[id])
        }
        return this.http.get<ISMHIHydrologicalStationWaterLevelData>(`${this.api}${this.version}${waterLevelParameter}${station}${period}/${data}${this.fileType}`).pipe(
          tap(data => {
            console.log("Using fetched data")
            const previousData = this.localStorageService.getStoredData("hydrologicaldata") as {[key: string]: ISMHIHydrologicalStationWaterLevelData};
            previousData[id] = data
            this.localStorageService.setStoredData("hydrologicaldata", previousData)
          }),
          catchError(err => {
            console.log(err)
            return EMPTY
          })
        )
      }),
    )

  }
}

