import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dummydata from '../../../assets/stubs/location-data.json'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

/*   getWeatherLocation(query: string){
    const path = `/location?query=${query}`
    return this.http.get(`${environment.dev.serverUrl}${path}`).pipe(
      map(data => {
        console.log(data);
        return data
      })
    );
  } */
  getWeatherLocation(query: string){
    return of(dummydata)
  }
}