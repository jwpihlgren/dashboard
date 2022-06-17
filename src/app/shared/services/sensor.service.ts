
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
  eventSource!: EventSourcePolyfill

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

  eventSourceDestory() {
    this.eventSource.close()

  }
  getSensor(id:string, token:string): Observable<any> {
    this.eventSource = this.getEventSource(id, token);

    this.eventSource.addEventListener('message', (event: any) => this._ngZone.run(() => this.subject$.next(event)))
    this.eventSource.addEventListener('heartbeat', (event: any) => this._ngZone.run(() => this.subject$.next(event)))
    this.eventSource.onerror = (error: any) => {
/*       this._ngZone.run(() => this.subject$.error(error)) */
      this.eventSource.close()
      setTimeout(() => {
        this.getSensor(id, token)
      }, 1000 * 30)
    }
    
    return this.subject$.pipe(tap(event => console.log(event)), filter(event=> event.type !== 'heartbeat'), map(event => JSON.parse(event.data)))
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
