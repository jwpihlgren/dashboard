import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { GridComponent } from './layouts/grid/grid.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { DxChartModule } from 'devextreme-angular';
import { NgxGaugeModule } from 'ngx-gauge';
import { SoilMoistureCardComponent } from './components/soil-moisture-card/soil-moisture-card.component';




@NgModule({
  declarations: [
    LeftNavComponent,
    GridComponent,
    WeatherCardComponent,
    SoilMoistureCardComponent
  ],
  imports: [
    CommonModule,
    DxChartModule,
    NgxGaugeModule

  ],
  exports: [
    LeftNavComponent,
    GridComponent,
    WeatherCardComponent,
    DxChartModule,
    NgxGaugeModule,
    SoilMoistureCardComponent

    
  ]
})
export class SharedModule { }
