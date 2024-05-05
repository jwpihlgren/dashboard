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
import { OceanographicalParameterListComponent } from './components/oceanographical-observations/oceanographical-parameter-list/oceanographical-parameter-list.component';
import { OceanographicalStationListComponent } from './components/oceanographical-observations/oceanographical-station-list/oceanographical-station-list.component';
import { OceanographicalDetailedStationComponent } from './components/oceanographical-observations/oceanographical-detailed-station/oceanographical-detailed-station.component';
import { OceanographicalPeriodComponent } from './components/oceanographical-observations/oceanographical-detailed-station/components/oceanographical-period/oceanographical-period.component';
import { HydrologicalPeriodComponent } from './components/hydrological-observations/hydrological-detailed-station/components/oceanographical-period/hydrological-period.component';
import { HydrologicalDetailedStationComponent } from './components/hydrological-observations/hydrological-detailed-station/hydrological-detailed-station.component';
import { HydrologicalParameterListComponent } from './components/hydrological-observations/hydrological-parameter-list/hydrological-parameter-list.component';
import { HydrologicalStationListComponent } from './components/hydrological-observations/hydrological-station-list/oceanographical-station-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "weather", component: WeatherComponent, canActivate: [AuthGuard]},
//  {path: "soilmoisture", component: SoilmoistureComponent, canActivate: [AuthGuard]},
  {path: "oceanographical-observations", component: OceanographicalObservationsComponent, /* canActivate: [AuthGuard],  */children: [
    {path: "", component: OceanographicalParameterListComponent, /* canActivate: [AuthGuard] */},
    {path: "parameter/:parameter", component: OceanographicalStationListComponent, /* canActivate: [AuthGuard] */},
    {path: "parameter/:parameter/station/:station", component: OceanographicalDetailedStationComponent, /* canActivate: [AuthGuard], */ children: [
      {path: "period/:period", component: OceanographicalPeriodComponent, /* canActivate: [AuthGuard] */},
    ]},
  ]},
  {path: "hydrological-observations", component: HydrologicalObservationsComponent, /* canActivate: [AuthGuard],  */children: [
    {path: "", component: HydrologicalParameterListComponent, /* canActivate: [AuthGuard] */},
    {path: "parameter/:parameter", component: HydrologicalStationListComponent, /* canActivate: [AuthGuard] */},
    {path: "parameter/:parameter/station/:station", component: HydrologicalDetailedStationComponent, /* canActivate: [AuthGuard], */ children: [
      {path: "period/:period", component: HydrologicalPeriodComponent, /* canActivate: [AuthGuard] */},
    ]},
  ]},

  {path: "test", component: TestComponent},
  {path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
