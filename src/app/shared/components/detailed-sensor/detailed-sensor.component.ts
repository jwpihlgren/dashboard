import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensor } from '../../models/sensor.interface';
import { ISoilMoistureData } from '../../models/soil-moisture-data.interface';
import { SensorService } from '../../services/sensor.service';
import { faTimes, faPen} from '@fortawesome/free-solid-svg-icons';
import { IPartialSensor } from '../../models/partial-sensor.interface';

@Component({
  selector: 'app-detailed-sensor',
  templateUrl: './detailed-sensor.component.html',
  styleUrls: ['./detailed-sensor.component.css']
})
export class DetailedSensorComponent implements OnInit {
  
  @ViewChild("edit") elementRef!: ElementRef
  @Input() sensor!: ISensor
  @Output() requestChangename: EventEmitter<IPartialSensor> = new EventEmitter()
  readings$!: Observable<ISoilMoistureData[]>

  selections: any = {
    day: {
      isToggled: true,
      toggle: () => this.selections.day.isToggled = true,
      getReadings: (id: string) => this.sensorService.getDaily(id)
    },
    week:{
      isToggled: false,
      toggle: () => this.selections.week.isToggled = true,
      getReadings: (id: string) => this.sensorService.getWeekly(id)
    },
    month: {
      isToggled: false,
      toggle: () => this.selections.month.isToggled = true,
      getReadings: (id: string) => this.sensorService.getMonthly(id)
    }
  }

  isDayToggled: boolean = true
  isWeekToggled: boolean = false
  isMonthToggled: boolean = false


  isEditToggled: boolean = false
  editIsPristine: boolean = true
  faEdit = faPen
  faTimes = faTimes

  

  constructor(private sensorService: SensorService) { }



  ngOnInit(): void {
    console.log(this.sensor);
    this.readings$ = this.sensorService.getDaily(this.sensor._id)
  }

  toggleSelection(selection: string, sensorId: string) {
    Object.values(this.selections).forEach((selection: any) => selection.isToggled = false)
    this.selections[selection].toggle()
    this.readings$ = this.selections[selection].getReadings(sensorId)
  }

  setEditTrue(): void {
    this.isEditToggled = true
  }

  editName(id: string): void {
    const newName = this.elementRef.nativeElement.value
    if(newName.length > 0) {
      const updatedSensor: IPartialSensor = {_id: id, alias: newName}
      this.requestChangename.emit(updatedSensor)
      this.abort()
    }
  }
  

  abort(): void {
    this.isEditToggled = false;
    this.editIsPristine = true;
    this.elementRef.nativeElement.value = ""
    this.elementRef.nativeElement.blur()
  }

}
