import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPollenForecast } from '../../models/interfaces/pollenrapporten/pollen-forecast';

@Component({
  selector: 'app-pollen-forecast',
  templateUrl: './pollen-forecast.component.html',
  styleUrls: ['./pollen-forecast.component.css']
})
export class PollenForecastComponent {

  now: Date = new Date()
  @Input() forecast!: IPollenForecast
  @Output() requestNewData: EventEmitter<Date> = new EventEmitter()
  showLongDescription: boolean = false

  selectDate(date: Date): void {
    this.requestNewData.emit(date)
  }

  isCurrent(date: Date, currentDate: Date): boolean {
    return new Date(date).getTime() === new Date(currentDate).getTime()
  }

  toggleShowLongDescription(): void {
    this.showLongDescription = !this.showLongDescription
  }

}




