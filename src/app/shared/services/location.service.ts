import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { inject, Injectable } from '@angular/core';
import { map, of, Observable, debounceTime, Subject, switchMap } from 'rxjs';
import * as dummydata from '../../../assets/stubs/location-data.json'
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';
import { SessionStorageService } from './session-storage.service';
import { ILocationResponse } from '../models/locationResponse.interface';
import UrlBuilder from '../utils/url-builder';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  protected httpClient: HttpClient = inject(HttpClient)
  protected userService: UserService = inject(UserService)
  protected localStorageService: LocalStorageService = inject(LocalStorageService)
  protected sessionStorageService: SessionStorageService = inject(SessionStorageService)

  private search = new Subject<string | undefined>()
  searchResults$: Observable<ILocation[]>

  constructor(
  ) {
    this.searchResults$ = this.search.pipe(
      switchMap(query => {
        if(query === undefined) return of([])
        return this.request(query)
      })
    )
  }

  find(query: string): void {
    this.search.next(query)
  }

  clear(): void {
    this.search.next(undefined)
  }

  private request(query: string): Observable<ILocation[]> {

    const api = environment.dev.serverUrl
    const endpoint = "location"

    const urlBuilder = new UrlBuilder(api, endpoint)
    urlBuilder.addQueryParam("query", query)


    //return of(dummydata)

    const previousQueries: any = this.localStorageService.getStoredData("queries")
    if (previousQueries && previousQueries[query]) {
      return of(previousQueries[query])
    }

    return this.httpClient.get(`${urlBuilder.url}`).pipe(
      map((data: any) => {
        const locations: ILocation[] = []
        if (data && data.length !== 0) {
          data.forEach((location: any) => locations.push(this.createLocationObject(location)))
        }
        const previousQueries: any = this.localStorageService.getStoredData("queries")
        previousQueries[query] = locations
        this.localStorageService.setStoredData("queries", previousQueries)
        return locations
      })
    );
  }

  private createLocationObject(obj: ILocationResponse): ILocation {
    const location: ILocation = {
      name: obj.name,
      region: obj.region,
      local_name: obj.local_names?.sv ? obj.local_names.sv : obj.name,
      lat: obj.lat,
      lon: obj.lon,
      country: obj.country
    }

    return location
  }
}


