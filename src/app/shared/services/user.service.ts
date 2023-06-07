import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap, catchError, EMPTY, retry, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
    ) { }

  getUserMetadata(): Observable<any> {
    return this.getUser().pipe(
      mergeMap((user: any) => {
        const url = `${environment.dev.serverUrl}/user/${user.sub}`
        return this.httpClient.get(url)
      }),
      retry(3),
      catchError((error: Error) => {
        console.log(error);
        return EMPTY
      }),
      shareReplay() 
    ) 
  }

  getUser(): Observable<any> {
    return this.authService.idTokenClaims$
  }
}
