import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-soil-moisture-card',
  templateUrl: './soil-moisture-card.component.html',
  styleUrls: ['./soil-moisture-card.component.css']
})
export class SoilMoistureCardComponent implements OnInit, OnChanges{

  faSeedling = faSeedling
  statusText!: string

  gaugeType: any = "arch";
  gaugeValue: any = 80;
  gaugeLabel: any = "Vardagsrum";
  gaugeAppendText: any  = "%";
  gaugeThickness: any = 18;
  gaugeCap: any = "round";
  gaugeSize: any = 325;
  min: number = 0;
  max:number = 100;
  marker: any = {
    "30": {
      type: "triangle",
      color: '#32d2ac'
    },
    "51": {
      type: "triangle",
      color: '#5693e9'
    },
  }
  foregroundColor: string = "#f8c03f"
  threshold = {
    '30': {color: '#32d2ac'},
    '51': {color: '#5693e9'}
    };

 @Input() sensor: any

  constructor() {
   }

  ngOnInit(): void {
    //console.log(this.sensor);
    this.statusText = this.getStatusText(this.sensor.values[0].value)
    console.log(this.sensor);
  }

  ngOnChanges(): void {
    this.statusText = this.getStatusText(this.sensor.values[0].value)
  }

  getStatusText(value: number): string {
    if(value < 30) return "Dags att vattna"
    else if( value >= 30 && value <= 50) return "Allt ser bra ut"
    else return "Vattna inte mer just nu"
  }
}
