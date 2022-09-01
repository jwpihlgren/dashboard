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

  getDetailedSensor(id: string, minDate: Date, maxDate: Date, groupBy: ("day" | "hour")): Observable<any> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/period`
    const params = `?minDate=${minDate}&maxDate=${maxDate}`
    return this.http.get(`${api}${path}${params}`).pipe(
      map(
        (data: any) => {
          switch(groupBy) {
            case "day": data.response[0].values = this.groupByDay(data.response[0].values); break; 
            case "hour": data.response[0].values = this.groupByHour(data.response[0].values); break; 
          }
          return data.response
      })
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

  groupByDay(values: any[]): any {
    const days: any = {}
    values.forEach((value: any) => {
      const day = new Date(value.date).toDateString()
      if(days[day]) days[day].push(value.value)
      else days[day] = [value.value]
    })

    return this.calculateAverageForEachEntry(days, "groupByDay")
  }

  groupByHour(values: any[]): any {
    const hours: any = {}
    values.forEach((value: any) => {
      const hour: number = new Date(value.date).getHours()
      if(hours[hour]) hours[hour].push(value.value)
      else hours[hour] = [value.value]
    })
    return this.calculateAverageForEachEntry(hours, "groupByHour")
  }

  private calculateAverageForEachEntry(obj: any, caller: "groupByDay" | "groupByHour"): any {
    const result: any = []
    for (const [key, values] of Object.entries(obj)) {
      const typedKey: string = key as string
      const typedValues: number[] = values as number[]
      const average: number = this.getAverage(typedValues)

      let date
      /* If groupByDay, typedKey is a date, else it's a string number representing the hour */
      if(caller === "groupByDay") {
        date = new Date(typedKey)
      }
      else {
        date = new Date()
        date.setHours(parseInt(typedKey))
      }
      result.push(
        {
          value: average,
          date: date
        }
      )
    }
    return result

  }
  
  private getAverage(arr: number[]): number {
    return Math.round(arr.reduce((acc: number, cur: number) => acc + cur) / arr.length)
  }
}
