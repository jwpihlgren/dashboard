import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { map, of, Observable, debounceTime } from 'rxjs';
import * as dummydata from '../../../assets/stubs/location-data.json'
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';
import { SessionStorageService } from './session-storage.service';
import { ILocationResponse } from '../models/locationResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
    ) { }

  getWeatherLocation(query: string): Observable<ILocation[]>{

    const url = environment.dev.serverUrl
    const path = `/location`
    const params = `?query=${query}`

    const previousQueries: any = this.localStorageService.getStoredData("queries")
    if(previousQueries && previousQueries[query]) {
      return of(previousQueries[query])
    }

    return this.httpClient.get(`${url}${path}${params}`).pipe(
      map((data: any) => {
        const locations: ILocation[] = []
        if(data && data.length !== 0) {
          data.forEach((location: any) => locations.push(this.createLocationObject(location)))
        }
        const previousQueries: any = this.localStorageService.getStoredData("queries")
        previousQueries[query] = locations
        this.localStorageService.setStoredData("queries", previousQueries)
        return locations
      })
    );
  }



/*   getWeatherLocation(query: string){
    return of(dummydata)
  } */

  getUserFavoriteLocation(): Observable<ILocation> {
    const ITEM_NAME = "favorite_location"
    const previousFavorite: ILocation = this.sessionStorageService.getStoredData(ITEM_NAME) as ILocation
    if(Object.keys(previousFavorite).length > 0) {
      return of(previousFavorite)
    }
    return this.userService.getUserMetadata().pipe(
      debounceTime(200),
      map((response:any) => {
        this.sessionStorageService.setStoredData(ITEM_NAME, response.favorite_location)
        return response.favorite_location
      })
    )
  }

  private createLocationObject(obj: ILocationResponse): ILocation {
    const location: ILocation = {
      name: obj.name,
      region: obj.region,
      local_name: obj.local_names?.sv ? obj.local_names.sv : obj.name,
      lat: obj.lat,
      lon:obj.lon,
      country: obj.country
    }

    return location
  }


}
