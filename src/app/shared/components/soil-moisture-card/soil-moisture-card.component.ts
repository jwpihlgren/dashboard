import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensor } from '../../models/sensor.interface';
import { ISoilMoistureData } from '../../models/soil-moisture-data.interface';
import { SensorService } from '../../services/sensor.service';


@Component({
  selector: 'app-soil-moisture-card',
  templateUrl: './soil-moisture-card.component.html',
  styleUrls: ['./soil-moisture-card.component.css']
})
export class SoilMoistureCardComponent implements OnInit{

  statusText!: string
  gaugeType: any = "arch";
  gaugeValue: any = 80;
  gaugeLabel: any = "Vardagsrum";
  gaugeAppendText: any  = "%";
  gaugeThickness: any = 18;
  gaugeCap: any = "round";
  gaugeSize: any = 300;
  min: number = 0;
  max:number = 100;
  marker: any = {
    "45": {
      type: "triangle",
      color: '#32d2ac'
    },
    "81": {
      type: "triangle",
      color: '#5693e9'
    },
  }
  foregroundColor: string = "#f8c03f"
  threshold = {
    '45': {color: '#32d2ac'},
    '81': {color: '#5693e9'}
    };



 @Input() sensor!: ISensor
  measurement$!: Observable<ISoilMoistureData>

  constructor(private sensorService: SensorService) {
    
   }

  ngOnInit(): void {
    /* Todo: Move this to parent component */
    this.measurement$ = this.sensorService.subscribeToSensor(this.sensor._id)
  }

/*   ngOnChanges(): void {
  }
 */
  getStatusText(value: number): string {
    if(value === -1) return `Det finns inga mätvärden ännu`
    else if(value < 45) return "Dags att vattna"
    else if( value >= 45 && value <= 80) return "Allt ser bra ut"
    else if (value > 80) return "Vattna inte mer just nu"
    else return `Det finns inga mätvärden ännu`
  }

  isDateOlderThanOneHour(date: Date): boolean {
    const inputDateTime = new Date(date)
    const currentDatetime = new Date()
    const difference = Math.abs(currentDatetime.getTime() - inputDateTime.getTime()) / 1000 / 60 / 60
    return difference > 1
  }
}
