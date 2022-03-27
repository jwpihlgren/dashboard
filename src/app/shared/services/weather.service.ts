import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(location: any){
    const path = `/weather?lat=${location.lat}&lon=${location.lon}`
    return this.http.get(`${environment.dev.serverUrl}${path}`).pipe(
      map(data => {
        return data
      })
    );
  }
}