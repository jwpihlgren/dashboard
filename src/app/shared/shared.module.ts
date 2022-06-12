import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { GridComponent } from './layouts/grid/grid.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { SoilMoistureCardComponent } from './components/soil-moisture-card/soil-moisture-card.component';
import { AddUnitPipe } from './pipes/add-unit.pipe';
import { DegToCompassPipe } from './pipes/deg-to-compass.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { BarRangeChartComponent } from './components/bar-range-chart/bar-range-chart.component';



@NgModule({
  declarations: [
    LeftNavComponent,
    GridComponent,
    WeatherCardComponent,
    SoilMoistureCardComponent,
    AddUnitPipe,
    DegToCompassPipe,
    MenuItemComponent,
    ClickedOutsideDirective,
    BarRangeChartComponent,
  ],
  imports: [
    CommonModule,
    NgxGaugeModule,
    FontAwesomeModule,
    AppRoutingModule

  ],
  exports: [
    LeftNavComponent,
    GridComponent,
    WeatherCardComponent,
    NgxGaugeModule,
    SoilMoistureCardComponent,
    FontAwesomeModule,
    MenuItemComponent,
    ClickedOutsideDirective,
    BarRangeChartComponent,
    
  ]
})
export class SharedModule { }