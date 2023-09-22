import { WaterLevelService } from './../../shared/services/water-level.service';
import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { ISMHIHydrologicalBase } from 'src/app/shared/models/smhi-hydrological-base';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  stations$!: Observable<ISMHIHydrologicalBase>

  constructor(private waterLevelService: WaterLevelService) { }

  ngOnInit(): void {
    this.stations$ = this.waterLevelService.getWaterLevels()
  }

}
