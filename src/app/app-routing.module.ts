import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SoilmoistureComponent } from './components/soilmoisture/soilmoisture.component';
import { TestComponent } from './components/test/test.component';
import { HydrologicalObservationsComponent } from './components/hydrological-observations/hydrological-observations.component';
import { OceanographicalObservationsComponent } from './components/oceanographical-observations/oceanographical-observations.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "weather", component: WeatherComponent, canActivate: [AuthGuard]},
  {path: "soilmoisture", component: SoilmoistureComponent, canActivate: [AuthGuard]},
  {path: "hydrologicalobservations", component: HydrologicalObservationsComponent, canActivate: [AuthGuard]},
  {path: "oceanographicalobservations", component: OceanographicalObservationsComponent, canActivate: [AuthGuard]},
 /*  {path: "test", component: TestComponent}, */
  {path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
