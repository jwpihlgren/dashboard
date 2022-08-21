import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { map, of, Observable } from 'rxjs';
import * as dummydata from '../../../assets/stubs/location-data.json'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
    ) { }

  getWeatherLocation(query: string){
    const path = `/location?query=${query}`
    return this.httpClient.get(`${environment.dev.serverUrl}${path}`).pipe(
      map(data => {
        console.log(data);
        return data
      })
    );
  }

/*   getWeatherLocation(query: string){
    return of(dummydata)
  } */

  getUserFavoriteLocation(): Observable<any> {
    return this.userService.getUserMetadata().pipe(
      map((data:any) => {
        return data.response.favorite_location
      })
    )
  }
}