import { SensorService } from './../../shared/services/sensor.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sensors$!: Observable<any>

  constructor(
    private sensorService: SensorService
  ){}

  ngOnInit(): void {
    this.sensors$ = this.sensorService.getSensors()
  }

}
