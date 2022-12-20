import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
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
      })
    ) 
  }

  getUser(): Observable<any> {
    return this.authService.idTokenClaims$
  }
}
