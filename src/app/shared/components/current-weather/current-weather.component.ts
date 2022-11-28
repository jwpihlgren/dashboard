import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) { }

  @Input() forecast: any

  ngOnInit(): void {
  }

  getIconUrl(icon:string): string {
    return this.weatherService.getIconUrl(icon)
  }

}
