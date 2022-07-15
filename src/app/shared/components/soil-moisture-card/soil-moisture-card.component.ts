import { SensorService } from './../../services/sensor.service';
import { Component, Input, OnInit } from '@angular/core';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-soil-moisture-card',
  templateUrl: './soil-moisture-card.component.html',
  styleUrls: ['./soil-moisture-card.component.css']
})
export class SoilMoistureCardComponent implements OnInit{

  faSeedling = faSeedling
  statusText!: string

  gaugeType: any = "arch";
  gaugeValue: any = 80;
  gaugeLabel: any = "Vardagsrum";
  gaugeAppendText: any  = "%";
  gauageThickness: any = 18;
  guageCap: any = "round";
  guageSize: any = 325;
  margin: number = 16 ;
  marker: any = {
    "30": {
      type: "triangle",
      color: '#32d2ac'
    },
    "50": {
      type: "triangle",
      color: '#5693e9'
    },
  }
  threshold = {
    '0': {color: '#f8c03f'},
    '30': {color: '#32d2ac'},
    '50': {color: '#5693e9'}
    };

 @Input() sensor: any

  constructor(private sensorService: SensorService) {
   }

  ngOnInit(): void {
    //console.log(this.sensor);
    this.statusText = this.getStatusText(this.sensor.values[0].value)
  }

  getStatusText(value: number): string {
    console.log(value);
    if(value < 30) return "Dags att vattna"
    else if( value >= 30 && value <= 40) return "Allt ser bra ut"
    else return "Vattna inte mer just nu"
  }
}
