
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Subject, Observable, tap, filter, catchError, of } from 'rxjs';
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
      }),
      catchError((error: any) => {
        console.log(error);
        return error

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
    
    return this.subject$.pipe(
      tap(event => console.log(event)), 
      filter(event=> event.type !== 'heartbeat'), 
      map(event => JSON.parse(event.data)),
      catchError((error: any) => {
        console.log(error)
        return error
      }
      ))
  }

  getDetailedSensor(id: string, pageSize?: number, pageCount?: number): Observable<any> {
    const pSize = pageSize ? `pageSize=${pageSize}` : ''
    const pCount = pageCount ? `pageCount=${pageCount}` : ''
    const and = pageSize && pageCount ? '&': ''
    const queryParams = pageSize || pageCount  ? `?${pSize}${and}${pCount}` : ''
    return this.http.get(`${environment.dev.serverUrl}/sensors/${id}/detailed${queryParams}`)
  }

  getPeriod(id: string, minDate: Date, maxDate: Date): Observable<any> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/period`
    const params = `?minDate=${minDate}&maxDate=${maxDate}`
    return this.http.get(`${api}${path}${params}`).pipe(
      map((data: any) => data.response)
    )
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
