import { SensorService } from './../../shared/services/sensor.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, mergeMap, Subscription } from 'rxjs';
import { faTimes, faPen} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit, OnDestroy {

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

  subscriptions: Subscription[] = []

  isDayToggled: boolean = true
  isWeekToggled: boolean = false
  isMonthToggled: boolean = false

  

  data$: Observable<any> = new Observable()

  @ViewChild("edit") elementRef!: ElementRef
  isEditToggled: boolean = false
  editIsPristine: boolean = true
  faEdit = faPen
  faTimes = faTimes

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getSensors()
  }

  getSensors(): void {
    this.data$ = this.sensorService.getSensors().pipe(
      mergeMap((data: any, index: number) => {
        const {minDate, maxDate} = this.selections["day"]
        return this.sensorService.getDetailedSensor(data.response[index]._id, minDate, maxDate)
      })
    )
  }

  toggleSelection(selection: string, sensorId: string) {
    Object.values(this.selections).forEach((selection: any) => selection.isToggled = false)
    this.selections[selection].isToggled = true
    const {minDate, maxDate} = this.selections[selection]
    this.data$ = this.sensorService.getDetailedSensor(sensorId, minDate, maxDate )
  }

  setEditTrue(): void {
    this.isEditToggled = true
  }

  editName(id: string): void {
    const newName = this.elementRef.nativeElement.value
    if(newName.length > 0) {
     this.subscriptions.push(this.sensorService.updateSensor(id, newName).subscribe(_ => {
      this.getSensors()
      this.abort()
    }))
    }
  }

  abort(): void {
    this.isEditToggled = false;
    this.editIsPristine = true;
    this.elementRef.nativeElement.value = ""
    this.elementRef.nativeElement.blur()
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

}
