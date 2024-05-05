import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap, throwError, concatMap } from 'rxjs';
import { IPollenForecast } from '../models/interfaces/pollenrapporten/pollen-forecast';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PollenService {

  private ISSUER = "Palynologiska laboratoriet vid Naturhistoriska riksmuseet"
  private ISSUER_URL = "https://pollenrapporten.se/omwebbplatsen/attanvandapollenprognoserna"
  private REGION_STORE_KEY = "regions"
  private REGION_TTL = 1000 * 60 * 60 * 24
  private BASE_URL = "https://api.pollenrapporten.se/v1"
  private POLLEN_TYPE_STORE_KEY = "pollen_type"

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
  ) { }

  detailedForecast(regionId: string, dateInForecast?: Date): Observable<IPollenForecast> {
    const endpoint = "forecasts"
    const quaryParams = `current=true&region_id=${regionId}`
    const url = `${this.BASE_URL}/${endpoint}?${quaryParams}`

    const regions: Observable<IPollenRegion[]> = this.getRegions()
    return regions.pipe(
      tap((regions: IPollenRegion[]) => {
        if (!this.verifyRegion(regionId, regions)) {
          throwError(() => {
            const error: any = new Error("Invalid region")
            error.timestamp = Date.now()
            return error
          })
        }
      }),
      concatMap((_) => {
        return this.getPollenTypes().pipe(
          concatMap((pollenTypes) => {
            console.log(pollenTypes)
            return this.http.get<IOPAForecastDto>(url).pipe(
              tap(data => console.log(data)),
              map((data: IOPAForecastDto) => this.mapOPAForecast(data, pollenTypes, dateInForecast )),
              tap(data => console.log(data)),
              map((data: IPollenForecast) => {
                data.pollenLevels = data.pollenLevels.filter((levelSeries) => {
                  const levelDateAtZeroHours = new Date(levelSeries.time.setHours(0)).getTime()
                  const currentDateAtZeroHours = new Date(data.currentDate.setHours(0)).getTime()
                  return levelDateAtZeroHours === currentDateAtZeroHours
                })
                return data
              })
            )
          }))
      })
    )
  }

  private getRegions(): Observable<IPollenRegion[]> {
    const endpoint = "regions"
    const url = `${this.BASE_URL}/${endpoint}`

    let regions = this.getRegionStore()
    if (regions.length !== 0) {
      return of(regions)
    }

    return this.http.get<IOPARegionsDto>(url).pipe(
      tap((data: IOPARegionsDto) => console.log(data)),
      map((data) => this.mapOPARegion(data)),
      tap((data) => this.setRegionStore(data)),
      catchError((error) => {
        console.log(error)
        return EMPTY
      }
      ))
  }


  private getPollenTypes(): Observable<IPollenType[]> {
    const endpoint = "pollen-types"
    const url = `${this.BASE_URL}/${endpoint}`
    const pollenTypes: IPollenType[] = this.getPollenTypesStore()
    if (pollenTypes.length !== 0) {
      return of(pollenTypes)
    }
    return this.http.get<IOPAPollenTypesDto>(url).pipe(
      map(data => this.mapOPAPollenTypes(data))
    )
  }

  private getPollenTypesStore(): IPollenType[] {
    const data: any = this.localStorage.getStoredData(this.POLLEN_TYPE_STORE_KEY)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timestamp || time > data.timeStamp + data.ttl) {
      return []
    }
    if (data.list) {
      const list: any[] = data.list
      const pollenTypes: IPollenType[] = list.filter<IPollenType>((obj: unknown): obj is IPollenType => {
        return (obj as IPollenType).id !== undefined
      })
    }
    return []
  }

  private verifyRegion(regionId: string, regions: IPollenRegion[]): boolean {
    const region: IPollenRegion | undefined = regions.find((region: IPollenRegion) => {
      region.id === regionId
    })
    return region !== undefined
  }

  private getRegionStore(): IPollenRegion[] {
    const data: any = this.localStorage.getStoredData(this.REGION_STORE_KEY)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timeStamp || time > data.timeStamp + data.ttl) {
      return []
    }
    if (data.list) {
      const list: any[] = data.list
      const regions: IPollenRegion[] = list.filter<IPollenRegion>((obj: unknown): obj is IPollenRegion => {
        return (obj as IPollenRegion).id !== undefined
      })
      return regions
    }
    return []
  }

  private setRegionStore(regions: IPollenRegion[]): void {
    const timeStamp = new Date().getTime()
    this.localStorage.setStoredData(this.REGION_STORE_KEY, {
      list: regions,
      timeStamp: timeStamp,
      ttl: this.REGION_TTL
    })
  }
  private mapOPARegion(data: IOPARegionsDto): IPollenRegion[] {
    const regions: IPollenRegion[] = []
    data.items.forEach(item => regions.push({ id: item.id, name: item.name }))
    return regions
  }

  private mapOPAPollenTypes(data: IOPAPollenTypesDto): IPollenType[] {
    const pollenTypes: IPollenType[] = data.items.map(item => {
      return { name: item.name, id: item.id }
    })
    return pollenTypes

  }

  private mapOPAForecast(data: IOPAForecastDto, pollenTypes: IPollenType[], dateInForecast?: Date): IPollenForecast {
    const innerData = data.items[0]
    const availableDates: Date[] = []
    for (let i = new Date(innerData.startDate); i <= new Date(innerData.endDate); i = new Date(i.setDate(i.getDate() + 1))) {
      availableDates.push(i)
    }

    const forecast: IPollenForecast = {
      id: innerData.id,
      fetchDate: new Date(),
      issuerName: this.ISSUER,
      issuerLink: this.ISSUER_URL,
      description: innerData.text,
      regionId: innerData.regionId,
      regionName: "Implement me",
      currentDate: dateInForecast || new Date(innerData.startDate),
      availableDates: availableDates,
      pollenLevels: innerData.levelSeries.map((levelSerie) => {
        return {
          pollenTypeName: levelSerie.pollenId,
          level: levelSerie.level,
          levelName: (pollenTypes.find((pollenType: IPollenType) => pollenType.id === levelSerie.pollenId) as IPollenType).name,
          time: new Date(levelSerie.time)
        }
      })
    }

    return forecast
  }
}



interface IPollenRegion {
  id: string
  name: string
}

interface IPollenType {
  id: string,
  name: string
}

interface IOPARegionsDto {
  _meta: {
    totalRecords: number
    offset: number
    limit: number
    count: number
  }
  _links: {
    href: string
    rel: string
  }[]
  items: {
    id: string
    name: string
    forecasts: string
  }[]
}


interface IOPAForecastDto {
  _meta: {
    totalRecords: number
    offset: number
    limit: number
    count: number
  }
  _links: {
    href: string
    rel: string
  }[]
  items: {
    id: string
    regionId: string
    startDate: string
    endDate: string
    text: string
    images: []
    levelSeries: {
      pollenId: string
      level: number
      time: string
    }[]
  }[]
}


interface IOPAPollenTypesDto {
  _meta: {
    totalRecords: number
    offset: number
    limit: number
    count: number
  }
  _links: {
    href: string
    rel: string
  }[]
  items: {
    id: string
    name: string
    forecasts: string
  }[]
}
