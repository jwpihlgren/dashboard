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

  gaugeType: any = "arch";
  gaugeValue: any = 80;
  gaugeLabel: any = "Vardagsrum";
  gaugeAppendText: any  = "%";
  gauageThickness: any = 18;
  guageCap: any = "round";
  guageSize: any = 325;
  threshold = {
    '0': {color: 'rgba(255, 150, 136, 1)'},
    '30': {color: 'rgba(248, 192, 63, 1)'},
    '60': {color: 'rgba(50, 210, 172, 1)'}
    };

 @Input() sensor: any

  constructor(private sensorService: SensorService) {
   }

  ngOnInit(): void {
    console.log(this.sensor);
  }
}
