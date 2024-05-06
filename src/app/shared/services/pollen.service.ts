import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap, throwError, concatMap, forkJoin } from 'rxjs';
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
  private POLLEN_TTL = 1000 * 60 * 60 * 24
  private BASE_URL = "https://api.pollenrapporten.se/v1"
  private POLLEN_TYPE_STORE_KEY = "pollen_type"

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
  ) { }

  detailedForecast(regionId: string, dateInForecast?: Date): Observable<IPollenForecast> {


    const regions: Observable<IOPARegionsDto> = this.getRegions()
    const pollenTypes: Observable<IOPAPollenTypesDto> = this.getPollenTypes()
    const forecasts: Observable<IOPAForecastDto> = this.getForecasts(regionId)

    return forkJoin({
      regions: regions,
      pollenTypes: pollenTypes,
      forecasts: forecasts
    }).pipe(
      map(data => {
        console.log(data)
        const mappedPollenTypes = this.mapOPAPollenTypes(data.pollenTypes)
        const mappedRegions = this.mapOPARegion(data.regions)
        const mappedForecastData = {
          forecast: data.forecasts,
          pollenTypes: mappedPollenTypes,
          regions: mappedRegions,
          dateInForecast: dateInForecast
        }
        const mappedForecasts = this.mapOPAForecast(mappedForecastData)
        mappedForecasts.pollenLevels = [...mappedForecasts.pollenLevels].filter(pollenLevel => {
          const pollenLevelTimeAtZweroHours = new Date(pollenLevel.time.setHours(0)).getTime()
          const currentDateAtZeroHours = new Date(mappedForecasts.currentDate.setHours(0)).getTime()
         return pollenLevelTimeAtZweroHours === currentDateAtZeroHours
        })
        return mappedForecasts
      })
    )
  }
  // Forecasts
  private getForecasts(regionId?: string): Observable<IOPAForecastDto> {
    const endpoint = "forecasts"
    const quaryParams = `current=true${regionId ? "&region_id=" + regionId : ""}`
    const url = `${this.BASE_URL}/${endpoint}?${quaryParams}`

    return this.http.get<IOPAForecastDto>(url).pipe(
      catchError(error => {
        console.log(error)
        return EMPTY
      }
    ))
  }

  private mapOPAForecast(data: {
    forecast: IOPAForecastDto,
    pollenTypes: IPollenType[],
    regions: IPollenRegion[],
    dateInForecast?: Date}): IPollenForecast {
    const innerData = data.forecast.items[0]
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
      regionName: (data.regions.find((region: IPollenRegion) => region.id === innerData.regionId) as IPollenRegion).name,
      currentDate: data.dateInForecast || new Date(innerData.startDate),
      availableDates: availableDates,
      pollenLevels: innerData.levelSeries.map((levelSerie) => {
        return {
          pollenTypeName: levelSerie.pollenId,
          level: levelSerie.level,
          levelName: (data.pollenTypes.find((pollenType: IPollenType) => pollenType.id === levelSerie.pollenId) as IPollenType).name,
          time: new Date(levelSerie.time)
        }
      })
    }
    return forecast
  }


  // Pollen types
  private getPollenTypes(): Observable<IOPAPollenTypesDto> {
    const endpoint = "pollen-types"
    const url = `${this.BASE_URL}/${endpoint}`
    const pollenTypes: IOPAPollenTypesDto | undefined = this.getPollenTypesStore()
    if (pollenTypes) {
      return of(pollenTypes)
    }
    return this.http.get<IOPAPollenTypesDto>(url).pipe(
      tap(data => this.setPollenTypesStore(data)),
      catchError((error) => {
        console.log(error)
        return EMPTY
      }
    ))

  }

  private getPollenTypesStore(): IOPAPollenTypesDto | undefined {
    const data: any = this.localStorage.getStoredData(this.POLLEN_TYPE_STORE_KEY)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timestamp || time > data.timeStamp + data.ttl) {
      return undefined
    }
    return
  }

  private setPollenTypesStore(pollenTypes: IOPAPollenTypesDto): void {
    const timeStamp = new Date().getTime()
    this.localStorage.setStoredData(this.POLLEN_TYPE_STORE_KEY, {
      timeStamp: timeStamp,
      ttl: this.POLLEN_TTL,
      ...pollenTypes
    })
  }
  private mapOPAPollenTypes(data: IOPAPollenTypesDto): IPollenType[] {
    const pollenTypes: IPollenType[] = data.items.map(item => {
      return { name: item.name, id: item.id }
    })
    return pollenTypes

  }

  // Region
  private getRegions(): Observable<IOPARegionsDto> {
    const endpoint = "regions"
    const url = `${this.BASE_URL}/${endpoint}`

    let regions: IOPARegionsDto | undefined = this.getRegionStore()
    if (regions) {
      return of(regions)
    }

    return this.http.get<IOPARegionsDto>(url).pipe(
      tap((data) => this.setRegionStore(data)),
      catchError((error) => {
        console.log(error)
        return EMPTY
      }
      ))
  }

  private verifyRegion(regionId: string, regions: IPollenRegion[]): boolean {
    const region: IPollenRegion | undefined = regions.find((region: IPollenRegion) => {
      region.id === regionId
    })
    return region !== undefined
  }

  private getRegionStore(): IOPARegionsDto | undefined {
    const data: any = this.localStorage.getStoredData(this.REGION_STORE_KEY)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timeStamp || time > data.timeStamp + data.ttl) {
      return undefined
    }
    return data as IOPARegionsDto
  }

  private setRegionStore(regions: IOPARegionsDto): void {
    const timeStamp = new Date().getTime()
    this.localStorage.setStoredData(this.REGION_STORE_KEY, {
      timeStamp: timeStamp,
      ttl: this.REGION_TTL,
      ...regions
    })
  }
  private mapOPARegion(data: IOPARegionsDto): IPollenRegion[] {

    const regions: IPollenRegion[] = []
    data.items.forEach(item => regions.push({ id: item.id, name: item.name }))
    return regions
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
  ttl?: Date
  timestamp?: Date
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
  ttl?: Date
  timestamp?: Date
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
