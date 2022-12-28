import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Subject, Observable, tap, filter, catchError, of, EMPTY, retry, shareReplay, share, mergeMap, delay, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ISensor } from '../models/sensor.interface';
import { ISoilMoistureData } from '../models/soil-moisture-data.interface';
import { IPartialSensor } from '../models/partial-sensor.interface';

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

  getSensors(): Observable<ISensor[]>{
    return this.http.get<ISensor[]>(`${environment.dev.serverUrl}/sensors`).pipe(
      tap((sensor: ISensor[]) => {
      }),
      retry(3),
      catchError((error: Error) => {
        console.log(error);
        return EMPTY
      }),
      shareReplay()
    )
  }



  subscribeToSensor(id:string): Observable<any> {
    console.log(id);
    return this.getToken().pipe(
      mergeMap(token => {
        this.eventSource = this.getEventSource(id, token);

        this.eventSource.addEventListener('message', (event: any) => this._ngZone.run(() => this.subject$.next(event)))
        this.eventSource.addEventListener('heartbeat', (event: any) => this._ngZone.run(() => this.subject$.next(event)))

        this.eventSource.onerror = (error: any) => {
                this.eventSource.close()
                setTimeout(() => {
                  this.subscribeToSensor(id)
                }, 1000 * 30)
              }
      return this.subject$.pipe(
        tap(event => console.log(event.data)), 
        filter(event=> event.type !== 'heartbeat'), 
        filter(event => JSON.parse(event.data).sensor === id ),
        map(event => JSON.parse(event.data)),
        retry(3),
        catchError((error: Error) => {
          console.log(error)
          return EMPTY
        }),
        )
      })
    )
  }

  getDetailedSensor(id: string, minDate: number, maxDate: number): Observable<any> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/period`
    const params = `?minDate=${minDate}&maxDate=${maxDate}`
    return this.http.get(`${api}${path}${params}`).pipe(
      map(
        (data: any) => {
          const daysBetweenDates = this.daysBetweenDates(minDate, maxDate)
          let set_hour_to_zero: boolean = true
          let dates: any[] = []

          if(daysBetweenDates === 0) {
           dates = this.createListOfHours()
            set_hour_to_zero = false
          }
          else if (daysBetweenDates <= 7) {
            dates = this.createListOfDates(daysBetweenDates)
          }
          else if (daysBetweenDates > 7) {
            dates = this.createListOfDates(daysBetweenDates)
            
          }

          data.response[0].values = this.spreadValuesAcrossDates(data.response[0].values, dates, set_hour_to_zero)
          return data.response          
      }),
      retry(3),
      catchError((error: Error) => {
        console.log(error)
        return EMPTY
      })
    )
  }

  getDaily(id: string): Observable<ISoilMoistureData[]> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/daily`
    return this.http.get<ISoilMoistureData[]>(`${api}${path}`).pipe(
      tap(data => console.log(data)),
      retry(3),
      catchError((error: Error) => {
        console.log(error)
        return EMPTY
      }),
      shareReplay()
    )
  }
  getWeekly(id: string): Observable<ISoilMoistureData[]> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/weekly`
    return this.http.get<ISoilMoistureData[]>(`${api}${path}`).pipe(
      tap(data => console.log(data)),
      retry(3),
      catchError((error: Error) => {
        console.log(error)
        return EMPTY
      }),
      shareReplay()
    )
  }
  getMonthly(id: string): Observable<ISoilMoistureData[]> {
    const api = environment.dev.serverUrl
    const path = `/sensors/${id}/monthly`
    return this.http.get<ISoilMoistureData[]>(`${api}${path}`).pipe(
      tap(data => console.log(data)),
      retry(3),
      catchError((error: Error) => {
        console.log(error)
        return EMPTY
      }),
      shareReplay()
    )
  }

  updateSensor(partialSensor: IPartialSensor): Observable<any> {
    console.log("update sensor");
    const {_id, alias} = partialSensor
    const api = environment.dev.serverUrl
    const path = `/sensors/${_id}`
    const data = {_id: _id, alias: alias}

    return this.http.put(`${api}${path}`, data).pipe(
      tap(data => console.log(data)),
      timeout({
        each: 1000,
        with: () => {throw new Error("Request timedout")}
      }),
      catchError((error: Error) => {
        console.log(error);
        return EMPTY
      })
    )
  }


  private spreadValuesAcrossDates(values: any[], dates: Date[], resetHours: boolean): any[] {
    /* Create a new values object with the correct amount of data points */
    const newValues: any = {}
    dates.forEach((date: Date) => {
      newValues[date.toISOString()] = {
        value: [],
        date: date.toISOString()
      }
    })

    /* Parse the dates of each value and map them to the new values object */
    values.forEach((value: any) => {
      const date = new Date(value.date)
      if(resetHours) date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)

      const isoStringDate = date.toISOString()
      /* Because we named each property in the new value object with the correct time,
        we can now map all the real measurements
      */
      if(newValues[isoStringDate] && value.value) {
        newValues[isoStringDate].value.push(value.value)
      }
    })

    /* Calculate the average for each date, if there are several values.*/
    for (let [key, obj] of Object.entries(newValues)) {
      const keyAsString = key as string
      const objAsAby = obj as any
      const NUMBER_OF_VALUES = objAsAby.value.length

      let average;
      if(NUMBER_OF_VALUES === 0) {
        average = 0;
      }
      else {
        average = Math.round(objAsAby.value.reduce((acc: number, cur: number) => acc + cur) / NUMBER_OF_VALUES)
      }
      newValues[keyAsString].value = average
    }
    /*Return an array with the values from the new value object */
    return Object.values(newValues)
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
    return this.authService.getAccessTokenSilently().pipe(
      catchError((error: Error) => {
        console.log(error)
        return EMPTY
      })
    )
  }

  getEventSource(id: string, token: string): EventSourcePolyfill {
    return new EventSourcePolyfill(`${environment.dev.serverUrl}/sensors/${id}/subscribe`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  eventSourceDestory() {
    this.eventSource.close()
  }


  
  private getAverage(arr: number[]): number {
    return Math.round(arr.reduce((acc: number, cur: number) => acc + cur) / arr.length)
  }
}
