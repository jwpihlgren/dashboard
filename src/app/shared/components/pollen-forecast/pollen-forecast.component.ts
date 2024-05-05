import { Component, Input } from '@angular/core';
import { IPollenForecast } from '../../models/interfaces/pollenrapporten/pollen-forecast';

@Component({
  selector: 'app-pollen-forecast',
  templateUrl: './pollen-forecast.component.html',
  styleUrls: ['./pollen-forecast.component.css']
})
export class PollenForecastComponent {

  @Input() forecast!: IPollenForecast

}




