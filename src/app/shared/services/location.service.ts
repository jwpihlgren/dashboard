import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getWeatherLocation(query: string){
    const path = `/location?query=${query}`
    return this.http.get(`${environment.dev.serverUrl}${path}`).pipe(
      map(data => {
        return data
      })
    );
  }
}