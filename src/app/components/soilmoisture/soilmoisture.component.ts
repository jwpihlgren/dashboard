import { SensorService } from './../../shared/services/sensor.service';
import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit {

  data$: Observable<any> = new Observable()
  
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.data$ = this.sensorService.getSensors().pipe(
      mergeMap((data: any, index: number) => {
       /*  console.log(data); */
        return this.sensorService.getDetailedSensor(data.response[index]._id, 900)/* .pipe(tap(data => console.log(data))) */
      })
    )


/*     this.data$.subscribe(data => {console.log(data);}) */
  }

}
