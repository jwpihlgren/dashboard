import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getSensors(){
    return this.http.get(`${environment.dev.serverUrl}/sensors`).pipe(
      map(data => {
        console.log(data)
        return data
      })
    );
  }
}
