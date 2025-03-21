import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SoilmoistureComponent } from './components/soilmoisture/soilmoisture.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';
import { HydrologicalObservationsComponent } from './components/hydrological-observations/hydrological-observations.component';
import { OceanographicalObservationsComponent } from './components/oceanographical-observations/oceanographical-observations.component';
import { OceanographicalParameterListComponent } from './components/oceanographical-observations/oceanographical-parameter-list/oceanographical-parameter-list.component';
import { OceanographicalStationListComponent } from './components/oceanographical-observations/oceanographical-station-list/oceanographical-station-list.component';
import { OceanographicalDetailedStationComponent } from './components/oceanographical-observations/oceanographical-detailed-station/oceanographical-detailed-station.component';
import { OceanographicalPeriodComponent } from './components/oceanographical-observations/oceanographical-detailed-station/components/oceanographical-period/oceanographical-period.component';
import { HydrologicalPeriodComponent } from './components/hydrological-observations/hydrological-detailed-station/components/oceanographical-period/hydrological-period.component';
import { HydrologicalDetailedStationComponent } from './components/hydrological-observations/hydrological-detailed-station/hydrological-detailed-station.component';
import { HydrologicalParameterListComponent } from './components/hydrological-observations/hydrological-parameter-list/hydrological-parameter-list.component';
import { HydrologicalStationListComponent } from './components/hydrological-observations/hydrological-station-list/oceanographical-station-list.component';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AuthModule.forRoot({
      ...environment.auth,
      authorizationParams: {
        audience: `${environment.auth.audience}`,
        redirect_uri: `${environment.auth.redirectUri}`,
      },
      httpInterceptor: {
        allowedList: [
          `${environment.dev.serverUrl}/sensors`,
          `${environment.dev.serverUrl}/sensors/*`,
          `${environment.dev.serverUrl}/location`,
          `${environment.dev.serverUrl}/weather`,
          `${environment.dev.serverUrl}/user/`,
          `${environment.dev.serverUrl}/user/*`,
          `${environment.dev.serverUrl}/hass/*`
        ]
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
})
export class AppModule { }
