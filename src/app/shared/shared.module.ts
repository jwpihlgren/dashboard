import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UviConverterPipe } from './pipes/uvi-converter.pipe';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { sv } from 'date-fns/locale';

const swedishConfig = new DateFnsConfigurationService()
swedishConfig.setLocale(sv)

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxGaugeModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    DateFnsModule.forRoot()
  ],
  exports: [],
  providers: [
    UviConverterPipe,
    {
      provide: DateFnsConfigurationService, useValue: swedishConfig
    }
  ]
})
export class SharedModule { }
