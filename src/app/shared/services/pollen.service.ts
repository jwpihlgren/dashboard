import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap, forkJoin, Subject, shareReplay, switchMap } from 'rxjs';
import { IPollenForecast } from '../models/interfaces/pollenrapporten/pollen-forecast';
import { LocalStorageService } from './local-storage.service';
import UrlBuilder from '../utils/url-builder';

@Injectable({
  providedIn: 'root'
})
export class PollenService {
  protected localStorage: LocalStorageService = inject(LocalStorageService)
  protected http: HttpClient = inject(HttpClient)

  private BASE_URL = "https://api.pollenrapporten.se/v1"
  private ISSUER = "Palynologiska laboratoriet vid Naturhistoriska riksmuseet"
  private ISSUER_URL = "https://pollenrapporten.se/omwebbplatsen/attanvandapollenprognoserna"
  private REGION_TTL = 1000 * 60 * 60 * 24
  private POLLEN_TYPES_TTL = 1000 * 60 * 60 * 24
  private POLLEN_FORECAST_TTL = 1000 * 60 * 60 * 1
  private REGION_STORE_KEY = "regions"
  private POLLEN_TYPE_STORE_KEY = "pollen_type"
  private POLLEN_FORECAST_STORE_KEY = "pollen_forecast"
  private MAX_CHAR_COUNT_SHORT_DESCRIPTION = 150

  private query$: Subject<{ region: string, date: Date }> = new Subject()
  pollenForecast$: Observable<IPollenForecast>

  constructor() {
    this.pollenForecast$ = this.query$.pipe(
      switchMap(query => {
        return this.request(query.region, query.date)
      })
    )
  }

  queryPollenForecast(regionId: string, date: Date = new Date()): void {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    console.log(date)
    this.query$.next({ region: regionId, date: date })
  }

  private request(regionId: string, date: Date): Observable<IPollenForecast> {
    return this.generateDetailedForecast(regionId, date).pipe()
  }

  private generateDetailedForecast(regionId: string, dateInForecast?: Date): Observable<IPollenForecast> {
    const regions: Observable<IOPARegionsDto> = this.getRegions()
    const pollenTypes: Observable<IOPAPollenTypesDto> = this.getPollenTypes()
    const forecasts: Observable<IOPAForecastDto> = this.getForecasts(regionId)

    return forkJoin({
      regions: regions,
      pollenTypes: pollenTypes,
      forecasts: forecasts
    }).pipe(
      map((data: any) => {
        const mappedPollenTypes = this.mapOPAPollenTypes(data.pollenTypes)
        const mappedRegions = this.mapOPARegion(data.regions)
        const mappedForecastData = {
          forecast: data.forecasts,
          pollenTypes: mappedPollenTypes,
          regions: mappedRegions,
          dateInForecast: dateInForecast
        }
        const mappedForecasts: IPollenForecast = this.mapOPAForecast(mappedForecastData)
        mappedForecasts.pollenLevels = [...mappedForecasts.pollenLevels].filter(pollenLevel => {
          const pollenLevelTimeAtZweroHours = new Date(pollenLevel.time.setHours(0)).getTime()
          const currentDateAtZeroHours = new Date(mappedForecasts.currentDate.setHours(0)).getTime()
          return pollenLevelTimeAtZweroHours === currentDateAtZeroHours
        })
        return mappedForecasts
      }),
      shareReplay(1)
    )
  }

  private getForecasts(regionId: string = "all"): Observable<IOPAForecastDto> {
    const forecast = this.getForecastStore(regionId)

    const urlBuilder = new UrlBuilder(this.BASE_URL, "forecasts").addQueryParam("current", "true")
    if (regionId !== "all") urlBuilder.addQueryParam("region_id", regionId)
    if (forecast) {
      return of<IOPAForecastDto>(forecast)
    }
    return this.http.get<IOPAForecastDto>(urlBuilder.url).pipe(
      tap(data => this.setForecastStore(regionId, data)),
      catchError(error => {
        console.log(error)
        return EMPTY
      }
      ))
  }

  private getForecastStore(id: string): IOPAForecastDto | undefined {
    const data: any = this.localStorage.getStoredData(id)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timestamp || time > data.timestamp + data.ttl) {
      return undefined
    }
    return data as IOPAForecastDto
  }

  private setForecastStore(id: string, pollenForecasts: IOPAForecastDto): void {
    const timestamp = new Date().getTime()
    this.localStorage.setStoredData(id, {
      timestamp: timestamp,
      ttl: this.POLLEN_FORECAST_TTL,
      ...pollenForecasts
    })
  }

  private mapOPAForecast(data: {
    forecast: IOPAForecastDto,
    pollenTypes: IPollenType[],
    regions: IPollenRegion[],
    dateInForecast?: Date
  }): IPollenForecast {
    console.log(data.forecast)
    const innerData = data.forecast.items[0]
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    const availableDates: { id: number, date: Date }[] =
      Array.from(new Set(innerData.levelSeries.map(level => level.time))).map((date, index: number) => {
        return {
          id: index,
          date: new Date(date)
        }
      })
    const forecast: IPollenForecast = {
      id: innerData.id,
      fetchDate: new Date(),
      issuerName: this.ISSUER,
      issuerLink: this.ISSUER_URL,
      shortDescription: innerData.text.length > this.MAX_CHAR_COUNT_SHORT_DESCRIPTION ? innerData.text.substring(0, this.MAX_CHAR_COUNT_SHORT_DESCRIPTION - 3) + "..." : innerData.text,
      description: innerData.text.length > this.MAX_CHAR_COUNT_SHORT_DESCRIPTION ? innerData.text : undefined,
      regionId: innerData.regionId,
      regionName: (data.regions.find((region: IPollenRegion) => region.id === innerData.regionId) as IPollenRegion).name,
      currentDate: data.dateInForecast || today,
      availableDates: availableDates,
      pollenLevels: innerData.levelSeries.map((levelSerie) => {
        const res = {
          pollenTypeName: levelSerie.pollenId,
          level: levelSerie.level,
          levelName: (data.pollenTypes.find((pollenType: IPollenType) => pollenType.id === levelSerie.pollenId) as IPollenType).name,
          time: new Date(levelSerie.time)
        }
        return res
      })
    }

    console.log(forecast)
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
    if (!data.ttl || !data.timestamp || time > data.timestamp + data.ttl) {
      return undefined
    }
    return data as IOPAPollenTypesDto
  }

  private setPollenTypesStore(pollenTypes: IOPAPollenTypesDto): void {
    const timestamp = new Date().getTime()
    this.localStorage.setStoredData(this.POLLEN_TYPE_STORE_KEY, {
      timestamp: timestamp,
      ttl: this.POLLEN_TYPES_TTL,
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

  private getRegionStore(): IOPARegionsDto | undefined {
    const data: any = this.localStorage.getStoredData(this.REGION_STORE_KEY)
    const time: number = new Date().getTime()
    if (!data.ttl || !data.timestamp || time > data.timestamp + data.ttl) {
      return undefined
    }
    return data as IOPARegionsDto
  }

  private setRegionStore(regions: IOPARegionsDto): void {
    const timestamp = new Date().getTime()
    this.localStorage.setStoredData(this.REGION_STORE_KEY, {
      timestamp: timestamp,
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
