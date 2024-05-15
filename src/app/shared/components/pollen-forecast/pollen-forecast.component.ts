import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPollenForecast } from '../../models/interfaces/pollenrapporten/pollen-forecast';

@Component({
  selector: 'app-pollen-forecast',
  templateUrl: './pollen-forecast.component.html',
  styleUrls: ['./pollen-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollenForecastComponent implements OnInit {

  now: Date = new Date()
  @Input() forecast!: IPollenForecast
  @Output() requestNewData: EventEmitter<Date> = new EventEmitter()
  showLongDescription: boolean = false


  constructor() {}
  ngOnInit(): void {
    this.now.setHours(0)
    this.now.setMinutes(0)
    this.now.setSeconds(0)
    this.now.setMilliseconds(0)
  }

  selectDate(date: Date): void {
    this.requestNewData.emit(date)
  }

  toggleShowLongDescription(): void {
    this.showLongDescription = !this.showLongDescription
  }

}
