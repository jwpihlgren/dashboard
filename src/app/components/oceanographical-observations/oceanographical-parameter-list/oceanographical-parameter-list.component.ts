import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOceanographicalObservationsVersionResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-version-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-parameter-list',
  templateUrl: './oceanographical-parameter-list.component.html',
  styleUrls: ['./oceanographical-parameter-list.component.css']
})
export class OceanographicalParameterListComponent implements OnInit{

  oceanographicalObservationsParameters$?: Observable<IOceanographicalObservationsVersionResponse>
  
  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService
    ) { }

  ngOnInit(): void {
    this.oceanographicalObservationsParameters$ = this.oceanographicalObservationsService.getParameters()
  }  
}
