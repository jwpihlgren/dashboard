import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-soil-moisture-card',
  templateUrl: './soil-moisture-card.component.html',
  styleUrls: ['./soil-moisture-card.component.css']
})
export class SoilMoistureCardComponent implements OnInit {

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



  constructor() { }

  ngOnInit(): void {
  }

}
