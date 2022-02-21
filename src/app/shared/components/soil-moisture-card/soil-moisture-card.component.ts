import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-soil-moisture-card',
  templateUrl: './soil-moisture-card.component.html',
  styleUrls: ['./soil-moisture-card.component.css']
})
export class SoilMoistureCardComponent implements OnInit {

  gaugeType: any = "arch";
  gaugeValue: any = 60;
  gaugeLabel: any = "Vardagsrum";
  gaugeAppendText: any  = "%";
  gauageThickness: any = 18;
  guageCap: any = "round";
  guageSize: any = 300;
  threshold = {
    '0': {color: 'rgba(255, 150, 136, 1)'},
    '30': {color: 'rgba(255, 196, 12, 1)'},
    '60': {color: 'rgba(0, 255, 127, 1)'}
    };



  constructor() { }

  ngOnInit(): void {
  }

}
