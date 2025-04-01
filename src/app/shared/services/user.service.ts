import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
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

  user$
  constructor() {
    this.user$ = this.authService.user$
  }


  get isAuthenticated$() {
    return this.authService.isAuthenticated$
  }

  get user() {
    return this.user$
  }

  getUserMetadata(id: string): Observable<UserMetadata> {
      return this.requestUserMetaData(id)
  }

  setUserFavoritePollenForecastLoaction(id: string, region: IPollenRegion): Observable<UserMetadata> {
      return this.requestUserMetaData(id).pipe(
        switchMap(data => {
          const metadata = data
          metadata.favorite.pollenForecastLocation = region
          return this.setUserMetadata(id, metadata)
        })
      )
  }

  setUserFavoriteWeatherForecastLocation(id: string, location: ILocation): Observable<UserMetadata> {
      return this.requestUserMetaData(id).pipe(
        switchMap(data => {
          const metadata = data
          metadata.favorite.weatherForecastLocation = location
          return this.setUserMetadata(id, metadata)
        })
      )
  }

  private setUserMetadata(id: string, metadata: UserMetadata): Observable<UserMetadata> {
    const builder = new UrlBuilder(environment.dev.serverUrl, `user/${id}`)
    return this.httpClient.patch(builder.url, { user_metadata: metadata }).pipe(
      map((data: any) => {
        return data.user_metadata as UserMetadata
      })
    )
  }

  private requestUserMetaData(id: string): Observable<UserMetadata> {
    const builder = new UrlBuilder(environment.dev.serverUrl, `user/${id}`)
    return this.httpClient.get<UserMetadata>(builder.url)
  }

  getUser(): Observable<any> {
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
}


export interface UserMetadata {
  favorite: {
    weatherForecastLocation?: ILocation,
    pollenForecastLocation?: IPollenRegion
  }
}
