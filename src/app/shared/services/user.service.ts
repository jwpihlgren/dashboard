import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';
import { IPollenRegion } from './pollen.service';
import UrlBuilder from '../utils/url-builder';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected authService: AuthService = inject(AuthService)
  protected httpClient: HttpClient = inject(HttpClient)

  constructor() {
  }

  isAuthenticated$() {
    return this.authService.isAuthenticated$
  }

  setUserFavoritePollenForecastLoaction(id: string, metadata: UserMetadata, region: IPollenRegion): Observable<UserMetadata> {
    metadata.favorite!["pollenForecastLocation"] = region
    return this.setUserMetadata(id, metadata)
  }

  setUserFavoriteWeatherForecastLocation(id: string, metadata: UserMetadata, location: ILocation): Observable<UserMetadata> {
    metadata.favorite["weatherForecastLocation"] = location
    return this.setUserMetadata(id, metadata)
  }


  getUserMetadata(id: string): Observable<UserMetadata> {
    const builder = new UrlBuilder(environment.dev.serverUrl, `user/${id}`)
    return this.httpClient.get<UserMetadata>(builder.url).pipe(tap(data => console.log(data)))
  }

  getUser(): Observable<User | null | undefined> {
    return this.authService.idTokenClaims$
  }

  login(): void {
    this.authService.loginWithRedirect({});
  }

  logout(): void {
    this.authService.logout({
      logoutParams: {}
    })

  }

  private setUserMetadata(id: string, metadata: UserMetadata): Observable<UserMetadata> {
    const builder = new UrlBuilder(environment.dev.serverUrl, `user/${id}`)
    return this.httpClient.patch(builder.url, { user_metadata: metadata }).pipe(
      map((data: any) => {
        return data.user_metadata as UserMetadata
      })
    )
  }
}


export interface UserMetadata {
  favorite: {
    weatherForecastLocation?: ILocation,
    pollenForecastLocation?: IPollenRegion
  }
}
