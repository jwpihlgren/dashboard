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

  getDetailedSensor(id: string, minDate: number, maxDate: number): Observable<any> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/period`
    const params = `?minDate=${minDate}&maxDate=${maxDate}`
    return this.http.get(`${api}${path}${params}`).pipe(
      map(
        (data: any) => {
          const daysBetweenDates = this.daysBetweenDates(minDate, maxDate)
          if(daysBetweenDates === 0) {
            const listOfHours = this.createListOfHours()
          }
          else if (daysBetweenDates <= 7) {
            const dates = this.createListOfDates(daysBetweenDates)
            this.spreadValuesAcrossDates(data.response[0].values, dates)
          }
          else {
            console.log(this.createListOfDates(daysBetweenDates))
          }
          return data.response
      })
    )
  }

  private spreadValuesAcrossDates(values: any[], dates: Date[]): any[] {
    const newValues: any = {}
    dates.forEach((date: Date) => {
      newValues[date.toISOString()] = {
        value: [],
        date: date.toISOString()
      }
    })

    values.forEach((value: any) => {
      const date = new Date(value.date)
      date.setHours(0)
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)

      const isoStringDate = date.toISOString()
      if(newValues[isoStringDate]) {
        newValues[isoStringDate].value.push(value.value)
      }
      
    })

    for (let [key, obj] of Object.entries(newValues)) {
      const keyAsString = key as string
      const objAsAby = obj as any
      const average = Math.round(objAsAby.value.reduce((acc: number, cur: number) => acc + cur) / objAsAby.value.length)
      newValues[keyAsString].value = average
    }

    console.log(newValues);

   
    return values
  }

  private createListOfHours(): Date[] {
    const hours: Date[] = []
    for(let i = 0; i < 24; i++) {
      const date = new Date()
      date.setHours(i)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      hours.push(date)
    }

    return hours
  }

  private createListOfDates(numberOfDays: number): Date[] {
    const dates: Date[] = []
    for(let i = 0; i < numberOfDays; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      dates.push(date)
    }
    return dates
  }

  private daysBetweenDates(minDate: number, maxDate: number): number {
    const difference = new Date(maxDate).getTime() - new Date(minDate).getTime()
    const numberOfDaysBetween = Math.floor(difference / (1000 * 3600 * 24))
    return numberOfDaysBetween
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


  
  private getAverage(arr: number[]): number {
    return Math.round(arr.reduce((acc: number, cur: number) => acc + cur) / arr.length)
  }
}
