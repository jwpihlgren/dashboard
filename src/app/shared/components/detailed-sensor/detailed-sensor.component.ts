import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensor } from '../../models/sensor.interface';
import { ISoilMoistureData } from '../../models/soil-moisture-data.interface';
import { SensorService } from '../../services/sensor.service';
import { faTimes, faPen} from '@fortawesome/free-solid-svg-icons';
import { IPartialSensor } from '../../models/partial-sensor.interface';
import { IAreaChartData } from '../../models/area-chart-data';
import { IAreaChartConfig } from '../../models/area-chart-config';

@Component({
  selector: 'app-detailed-sensor',
  templateUrl: './detailed-sensor.component.html',
  styleUrls: ['./detailed-sensor.component.css'],
})
export class DetailedSensorComponent implements OnInit, OnChanges {
  
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

  chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    unit: '%',
    domain: [0, 100],
    data: []
  }

  isDayToggled: boolean = true
  isWeekToggled: boolean = false
  isMonthToggled: boolean = false


  isEditToggled: boolean = false
  editIsPristine: boolean = true
  faEdit = faPen
  faTimes = faTimes

  

  constructor(
    private sensorService: SensorService,
    private ref: ChangeDetectorRef
    ) { }



  ngOnInit(): void {
    this.readings$ = this.sensorService.getDaily(this.sensor._id)
    this.chartConfig.thresholds = [this.sensor.minThreshold / 100, this.sensor.maxThreshold / 100]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sensor = changes['sensor'].currentValue
    this.ref.detectChanges()
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

  toChartData(data: ISoilMoistureData[]): IAreaChartData[] {
    const chartData: IAreaChartData[] = data.map((reading: ISoilMoistureData) => {
      return {date: new Date(reading.createdAt), value: reading.value}
    })
    return chartData
  }

  getChartConfig(data: ISoilMoistureData[]): IAreaChartConfig {
    this.chartConfig.data = this.toChartData(data)
    return this.chartConfig
  }

}