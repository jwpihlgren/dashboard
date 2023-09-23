import { FormsModule } from '@angular/forms';
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
import { IsoToDatePipe } from './pipes/iso-to-date.pipe';
import { UviConverterPipe } from './pipes/uvi-converter.pipe';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserMenuItemComponent } from './components/user-menu-item/user-menu-item.component';
import { ColumnComponent } from './layouts/column/column.component';
import { MasonryGridComponent } from './layouts/masonry-grid/masonry-grid.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { DetailedSensorComponent } from './components/detailed-sensor/detailed-sensor.component';
import { SmallSoilSensorCardComponent } from './components/small-soil-sensor-card/small-soil-sensor-card.component';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { sv } from 'date-fns/locale';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { DetailedWeatherTableComponent } from './components/detailed-weather-table/detailed-weather-table.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { CyclonicConditionPipe } from './pipes/cyclonic-condition.pipe';
import { SimpleWaterLevelComponent } from './components/simple-water-level/simple-water-level.component';



const swedishConfig = new DateFnsConfigurationService()
swedishConfig.setLocale(sv)

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
    IsoToDatePipe,
    UviConverterPipe,
    SearchComponent,
    SearchResultComponent,
    HeaderComponent,
    LogoComponent,
    UserMenuItemComponent,
    ColumnComponent,
    MasonryGridComponent,
    CurrentWeatherComponent,
    DetailedSensorComponent,
    SmallSoilSensorCardComponent,
    StringToDatePipe,
    DetailedWeatherTableComponent,
    TypeofPipe,
    AreaChartComponent,
    CyclonicConditionPipe,
    SimpleWaterLevelComponent
  ],
  imports: [
    CommonModule,
    NgxGaugeModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    DateFnsModule.forRoot()
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
    UviConverterPipe,
    SearchComponent,
    CommonModule,
    SearchResultComponent,
    HeaderComponent,
    LogoComponent,
    UserMenuItemComponent,
    ColumnComponent,
    MasonryGridComponent,
    CurrentWeatherComponent,
    DetailedSensorComponent,
    SmallSoilSensorCardComponent,
    DateFnsModule,
    StringToDatePipe,
    DetailedWeatherTableComponent,
    AreaChartComponent,
    SimpleWaterLevelComponent
  ],
  providers: [
    UviConverterPipe,
    {
      provide: DateFnsConfigurationService, useValue: swedishConfig 
    }
  ]
})
export class SharedModule { }
