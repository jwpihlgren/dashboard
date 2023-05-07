import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, concat, delayWhen, interval, retry, retryWhen, switchMap, take, tap, throwError, timeout, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private http: HttpClient) { }


  ping(): Observable<boolean> {

    const url = environment.dev.serverUrl
    const path = `/ping`
    const delay = 60 * 1000
    const timesToRetry = 3
    const interval = 10 * 60 * 1000
    return timer(0, interval).pipe(
      switchMap(() => {
        return this.http.get<boolean>(`${url}${path}`).pipe(
          retryWhen(errors => errors.pipe(
            delayWhen(() => timer(delay)),
            take(timesToRetry),
            tap(() => console.log(`Time out after retrying`))
            
          )),
          catchError(error => {
            console.log(error);
            return EMPTY
          })
        )
      })
    )
  }
}
