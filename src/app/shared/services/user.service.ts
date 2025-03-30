import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';
import { IPollenRegion } from './pollen.service';
import UrlBuilder from '../utils/url-builder';

const CONSTANTS = {
  weatherForecastLocation: "favorite_location",
  pollenForecastLocation: "pollen_location"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected authService: AuthService = inject(AuthService)
  protected httpClient: HttpClient = inject(HttpClient)

  user$ = this.authService.user$

  constructor() { }


  get isAuthenticated$() {
    return this.authService.isAuthenticated$
  }

  getUserMetadata(): Observable<UserMetadata> {
    return this.user$.pipe(
      switchMap(user => {
        const id = user!.sub as string
        return this.requestUserMetaData(id)
      })
    )
  }

  setUserFavoritePollenForecastLoaction(region: IPollenRegion): Observable<UserMetadata> {
    return this.user$.pipe(
      switchMap(user => {
        const id = user!.sub as string
        return this.requestUserMetaData(id).pipe(
          switchMap(data => {
            console.log(data)
            const metadata = data
            metadata.favorite.pollenForecastLocation = region
            return this.setUserMetadata(id, metadata)
          })
        )
      }))
  }

  setUserFavoriteWeatherForecastLocation(location: ILocation): Observable<UserMetadata> {
    return this.user$.pipe(
      switchMap(user => {
        const id = user!.sub as string
        return this.requestUserMetaData(id).pipe(
          switchMap(data => {
            console.log(data)
            const metadata = data
            metadata.favorite.weatherForecastLocation = location
            return this.setUserMetadata(id, metadata).pipe(tap(data => console.log(data)))
          })
        )
      }))
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
    return this.httpClient.get(builder.url).pipe(
      map(data => {
        const dataObj = data as Record<string, any>
        const userMetaData: UserMetadata = { favorite: {} }
        if (dataObj.hasOwnProperty(CONSTANTS.weatherForecastLocation)) userMetaData.favorite["weatherForecastLocation"] = dataObj[CONSTANTS.weatherForecastLocation]
        if (dataObj.hasOwnProperty(CONSTANTS.pollenForecastLocation)) userMetaData.favorite["pollenForecastLocation"] = dataObj[CONSTANTS.pollenForecastLocation]
        return userMetaData
      })
    )
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


interface UserMetadata {
  favorite: {
    weatherForecastLocation?: ILocation,
    pollenForecastLocation?: IPollenRegion
  }
}
