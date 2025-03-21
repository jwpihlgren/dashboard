import { Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { IPollenForecast } from '../../models/interfaces/pollenrapporten/pollen-forecast';
import { DateFnsModule } from 'ngx-date-fns';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pollen-forecast',
  templateUrl: './pollen-forecast.component.html',
  styleUrls: ['./pollen-forecast.component.css'],
  imports: [DateFnsModule, NgClass]
})
export class PollenForecastComponent implements OnInit {

  now: Date = new Date()
  @Input() forecast!: IPollenForecast
  @Output() requestNewData: EventEmitter<{regionId: string, date: Date}> = new EventEmitter()
  showLongDescription: boolean = false



  constructor(private differService: KeyValueDiffers) {
  }
  ngOnInit(): void {
    this.now.setHours(0)
    this.now.setMinutes(0)
    this.now.setSeconds(0)
    this.now.setMilliseconds(0)
  }


  selectDate(regionId: string, date: Date): void {
    this.requestNewData.emit({regionId: regionId, date: date})
  }

  toggleShowLongDescription(): void {
    this.showLongDescription = !this.showLongDescription
  }

}
