import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ISoilMoistureData } from '../../models/soil-moisture-data.interface';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { SensorService } from '../../services/sensor.service';
import { ISensor } from '../../models/sensor.interface';
import { DateFnsInputDate } from 'ngx-date-fns';

@Component({
  selector: 'app-small-soil-sensor-card',
  templateUrl: './small-soil-sensor-card.component.html',
  styleUrls: ['./small-soil-sensor-card.component.css']
})
export class SmallSoilSensorCardComponent implements OnInit {

  @Input() sensor!: ISensor
  measurement: Signal<ISoilMoistureData | undefined> = signal(undefined)
  title: string = "Växter"
  gaugeParams: gaugeParams = {
    value: 0,
    type: "arch",
    thick: 8,
    cap: "round",
    size: 80,
    min: 0,
    max: 100,
    append: "%",
    foregroundColor: "#f8c03f",
    thresholds: {
      '45': {color: '#32d2ac'},
      '81': {color: '#5693e9'}
    },
  }

  test: DateFnsInputDate = new Date("2023-04-14T09:00:25.174Z")

  constructor(private sensorService: SensorService) { }

  ngOnInit(): void {
    this.measurement = toSignal(this.sensorService.subscribeToSensor(this.sensor._id))
    const minThreshold = this.sensor.minThreshold + ''
    const maxThreshold = this.sensor.maxThreshold + ''
    this.gaugeParams.thresholds = {
      [minThreshold]: {color: '#32d2ac'},
      [maxThreshold]: {color: '#5693e9'},
    }
  }

  getStatusText(value: number): string {
    if(value === -1) return `Det finns inga mätvärden ännu`
    else if(value < this.sensor.minThreshold) return "Dags att vattna"
    else if( value >= this.sensor.minThreshold && value <= this.sensor.maxThreshold) return "Allt ser bra ut"
    else if (value > this.sensor.maxThreshold) return "Vattna inte mer just nu"
    else return `Det finns inga mätvärden ännu`
  }

  isDateOlderThanOneHour(date: Date): boolean {
    const inputDateTime = new Date(date)
    const currentDatetime = new Date()
    const difference = Math.abs(currentDatetime.getTime() - inputDateTime.getTime()) / 1000 / 60 / 60
    return difference > 1
  }

}

interface gaugeParams {
  size: number
  type: NgxGaugeType
  min: number
  max: number
  value: number
  cap: "round" | "butt"
  thick: number
  label?: string
  foregroundColor: string
  backgroundColor?: string
  append: string
  prepend?: string
  duration?: number
  thresholds: {}
  margin?: number
  animate?: 0 | 1
  ariaLabel?: string
  ariaLabeledby?: string




}

