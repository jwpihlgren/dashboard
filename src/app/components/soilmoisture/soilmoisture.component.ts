import { SensorService } from './../../shared/services/sensor.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, mergeMap, Subscription } from 'rxjs';
import { faTimes, faPen} from '@fortawesome/free-solid-svg-icons';
import { ISensor } from 'src/app/shared/models/sensor.interface';
import { IPartialSensor } from 'src/app/shared/models/partial-sensor.interface';
@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []

  sensors$: Observable<any> = new Observable()

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getSensors()
  }

  getSensors(): void {
    this.sensors$ = this.sensorService.getSensors()
  }

  updateSensor(partialSensor: IPartialSensor) {
    this.sensorService.updateSensor(partialSensor)
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }


}
