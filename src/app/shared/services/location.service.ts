import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { map, of, Observable, debounceTime } from 'rxjs';
import * as dummydata from '../../../assets/stubs/location-data.json'
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private localStorageService: LocalStorageService
    ) { }

  getWeatherLocation(query: string): Observable<ILocation[]>{

    const previousQueries: any = this.localStorageService.getStoredData("queries")
    if(previousQueries && previousQueries[query]) {
      return of(previousQueries[query])
    }

    const url = environment.dev.serverUrl
    const path = `/location`
    const params = `?query=${query}`

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
    return this.userService.getUserMetadata().pipe(
      debounceTime(200),
      map((data:any) => {
        return data.response.favorite_location
      })
    )
  }

  private createLocationObject(obj: any): ILocation {
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
