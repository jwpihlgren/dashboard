import { SensorService } from './../../shared/services/sensor.service';
import { Component, OnInit, OnDestroy, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subscription } from 'rxjs';
import { IPartialSensor } from 'src/app/shared/models/partial-sensor.interface';
import { DetailedSensorComponent } from 'src/app/shared/components/detailed-sensor/detailed-sensor.component';
import { MasonryGridComponent } from 'src/app/shared/layouts/masonry-grid/masonry-grid.component';
import { ISensor } from 'src/app/shared/models/sensor.interface';
@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css'],
  imports: [DetailedSensorComponent, MasonryGridComponent]
})
export class SoilmoistureComponent implements OnDestroy {

  subscriptions$: Subscription[] = []

  sensors$: Observable<any> = new Observable()
  sensorArr: Signal<ISensor[] | undefined> = signal(undefined)

  constructor(
    private sensorService: SensorService
  ) { this.getSensors() }

  getSensors(): void {
    this.sensorArr = toSignal(this.sensorService.getSensors())
  }

  updateSensorAlias(partialSensor: IPartialSensor) {
    this.subscriptions$.push(this.sensorService.updateSensorAlias(partialSensor).subscribe())
    this.sensorArr = signal(undefined)
    this.getSensors()
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription: Subscription) => subscription.unsubscribe())
  }


}
