import { SensorService } from './../../shared/services/sensor.service';
import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit {

  selections: any = {
    day: {
      minDate: new Date().setHours(0,0,0,0),
      maxDate: new Date().setHours(23,59,59,999),
      isToggled: true,
      toggle: () => this.selections.day.isToggled = true
    },
    week:{
      minDate: new Date().setDate(new Date().getDate() - 7),
      maxDate: new Date().setHours(23,59,59,999),
      isToggled: false,
      toggle: () => this.selections.week.isToggled = true
    },
    month: {
      minDate: new Date().setMonth(new Date().getMonth() - 1),
      maxDate: new Date().setHours(23,59,59,999),
      isToggled: false,
      toggle: () => this.selections.month.isToggled = true
    }
  }

  isDayToggled: boolean = true
  isWeekToggled: boolean = false
  isMonthToggled: boolean = false

  data$: Observable<any> = new Observable()
  
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.data$ = this.sensorService.getSensors().pipe(
      mergeMap((data: any, index: number) => {
        return this.sensorService.getPeriod(data.response[index]._id, this.selections["day"].minDate, this.selections["day"].maxDate).pipe(tap(data => console.log(data)))
      })
    )


/*     this.data$.subscribe(data => {console.log(data);}) */
  }

  toggleSelection(selection: string, sensorId: string) {
    Object.values(this.selections).forEach((selection: any) => selection.isToggled = false)
    this.selections[selection].isToggled = true
    this.data$ = this.sensorService.getPeriod(sensorId, this.selections[selection].minDate, this.selections[selection].maxDate)
  }

  

}
