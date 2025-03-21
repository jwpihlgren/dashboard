import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IOceanographicalObservationsPeriodResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-station-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-detailed-station',
  templateUrl: './oceanographical-detailed-station.component.html',
  styleUrls: ['./oceanographical-detailed-station.component.css'],
  imports:  [RouterOutlet, RouterLink, RouterLinkActive, DatePipe, NgClass]
})
export class OceanographicalDetailedStationComponent implements OnInit {

  oceanographicalObservationsStation$?: Observable<IOceanographicalObservationsStationResponse>
  oceanographicalObservationsPeriod$?: Observable<IOceanographicalObservationsPeriodResponse>

  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.oceanographicalObservationsStation$ = this.oceanographicalObservationsService.getStation(parameter, station).pipe(
        tap((data) => console.log(data))
      )
  }

  back(): void {
    this.router.navigate(['/oceanographical-observations', 'parameter', this.route.snapshot.paramMap.get("parameter")])
  }
}

