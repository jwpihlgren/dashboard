import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { inject, Injectable, Signal } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { ILocation } from '../models/location.interface';
import { IPollenRegion } from './pollen.service';
import UrlBuilder from '../utils/url-builder';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected authService: AuthService = inject(AuthService)
  protected httpClient: HttpClient = inject(HttpClient)

  user: Signal<User | undefined | null>

  constructor() {
    this.user = toSignal(this.isAuthenticated$.pipe(
      switchMap(_ => {
        return this.authService.user$
      })
    ))
  }


  get isAuthenticated$() {
    return this.authService.isAuthenticated$
  }

  getUserMetadata(): Observable<UserMetadata> {
    const id = this.getUserId()
    if (id) {
      return this.requestUserMetaData(id)
    }
    return throwError(`${this.user} does not have property sub`)
  }

  setUserFavoritePollenForecastLoaction(region: IPollenRegion): Observable<UserMetadata> {
    const id = this.getUserId()
    if (id) {
      return this.requestUserMetaData(id).pipe(
        switchMap(data => {
          const metadata = data
          metadata.favorite.pollenForecastLocation = region
          return this.setUserMetadata(id, metadata)
        })
      )
    }

    return throwError(`${this.user} does not have property sub`)
  }

  setUserFavoriteWeatherForecastLocation(location: ILocation): Observable<UserMetadata> {
    const id = this.getUserId()
    if(id) {
        return this.requestUserMetaData(id).pipe(
          switchMap(data => {
            const metadata = data
            metadata.favorite.weatherForecastLocation = location
            return this.setUserMetadata(id, metadata)
          })
        )}

    return throwError(`${this.user} does not have property sub`)
  }

  private getUserId(): string | undefined {
    const id = this.user() && this.user()!.sub
    return id ? id : undefined
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
