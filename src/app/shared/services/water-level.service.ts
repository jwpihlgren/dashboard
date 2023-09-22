import { ISMHIHydrologicalBase } from './../models/smhi-hydrological-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, catchError, EMPTY, map,} from 'rxjs';
import { ISMHIDetailedWaterLevel } from '../models/smhi-detailed-water-level';
import { ISMHIHydrologicalStation } from '../models/smhi-hydrological-station';
import { ISMHIStationWithPeriods } from '../models/smhi-station-with-periods';
import { SMHIHydrologicalObservationPeriod } from '../models/smhi-hydrological-observation-period';

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {

  constructor(private http: HttpClient) { }

  base = "https://opendata-download-hydroobs.smhi.se/api/"
  version = "version/1.0/"
  waterLevelParameter = "parameter/3"
  fileType = ".json"


  getWaterLevels(): Observable<ISMHIHydrologicalBase> {
    return this.http.get<ISMHIHydrologicalBase>(`${this.base}${this.version}${this.waterLevelParameter}${this.fileType}`).pipe(
      tap(data => console.log(data)),
      map(data => {
        let stations: ISMHIHydrologicalStation[] = data.station.filter((station: ISMHIHydrologicalStation ) => {
          return this.getWaterLevelStationPeriods(station.id).pipe(
            tap(data => console.log(data)),
            map((stationPeriods: ISMHIStationWithPeriods) => {
              console.log(stationPeriods)
              return stationPeriods.period.reduce((acc: boolean, cur: SMHIHydrologicalObservationPeriod ) => {
                console.log(cur)
                return acc || cur.key === "corrected-archive"
              }, false)
            })
          )
        })
        console.log(stations);
        data.station = stations
        return data
      }),
      catchError(err => {
        console.log(err)
        return EMPTY
      })
    )
  }

  getWaterLevel(id: number): Observable<ISMHIDetailedWaterLevel> {
    const period = "period/corrected-archive/"
    const station = `station/${id}/`
    const data = "data"
    return this.http.get<ISMHIDetailedWaterLevel>(`${this.base}${this.version}${this.waterLevelParameter}${station}${period}${data}${this.fileType}`).pipe(
      tap(data => console.log(data)),
      catchError(err => {
        console.log(err)
        return EMPTY
      })
    )
  }

  private getWaterLevelStationPeriods(id: number): Observable<ISMHIStationWithPeriods> {

    const station = `station/${id}/`
    return this.http.get<ISMHIStationWithPeriods>(`${this.base}${this.version}${this.waterLevelParameter}${station}/${id}.json`).pipe(
      tap(data => console.log(data)),
      catchError(err => {
        console.log(err)
        return EMPTY
      })
    )
  }
}

