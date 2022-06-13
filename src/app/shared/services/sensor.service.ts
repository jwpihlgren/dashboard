
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Subject, Observable, tap, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventSourcePolyfill } from 'event-source-polyfill';
@Injectable({
  providedIn: 'root'
})
export class SensorService {

  subject$: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private _ngZone: NgZone,
    private authService: AuthService
    ) { }

  getSensors(){
    return this.http.get(`${environment.dev.serverUrl}/sensors`).pipe(
      map(data => {
        return data
      })
    );
  }

  getSensor(id:string, token:string): Observable<any> {
    const eventSource = this.getEventSource(id, token);

    eventSource.addEventListener('message', (event: any) => this._ngZone.run(() => this.subject$.next(JSON.parse(event.data))))
    eventSource.addEventListener('heartbeat', (event: any) => this._ngZone.run(() => this.subject$.next(JSON.parse(event.data))))
    eventSource.onerror = (error: any) => this._ngZone.run(() => this.subject$.error(error))
    
    return this.subject$.pipe(tap(data=>console.log(data)))
  }

  getToken(): Observable<any> {
    return this.authService.getAccessTokenSilently()
  }

  getEventSource(id:string, token:string): any {
    return new EventSourcePolyfill(`${environment.dev.serverUrl}/sensors/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
