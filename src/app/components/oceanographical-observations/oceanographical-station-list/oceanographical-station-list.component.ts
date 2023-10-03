import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOceanographicalObservationsParameterResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-parameter-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-station-list',
  templateUrl: './oceanographical-station-list.component.html',
  styleUrls: ['./oceanographical-station-list.component.css']
})
export class OceanographicalStationListComponent implements OnInit {


  oceanographicalObservationsStations$?: Observable<IOceanographicalObservationsParameterResponse>

  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.oceanographicalObservationsStations$ = this.oceanographicalObservationsService.getStations(params.get("parameter") as string)
    })
  }
  back(): void {
    this.router.navigate(['/oceanographical-observations'])
  }
}
