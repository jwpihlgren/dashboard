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



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    WeatherComponent,
    SoilmoistureComponent,
    TestComponent,
    HydrologicalObservationsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [
          `${environment.dev.serverUrl}/sensors`,
          `${environment.dev.serverUrl}/sensors/*`,
          `${environment.dev.serverUrl}/location`,
          `${environment.dev.serverUrl}/weather`,
          `${environment.dev.serverUrl}/user/`,
          `${environment.dev.serverUrl}/user/*`
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
  bootstrap: [AppComponent]
})
export class AppModule { }
