import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { IOceanographicalObservationsPeriodResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-station-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-detailed-station',
  templateUrl: './oceanographical-detailed-station.component.html',
  styleUrls: ['./oceanographical-detailed-station.component.css']
})
export class OceanographicalDetailedStationComponent implements OnInit {

  oceanographicalObservationsStation$?: Observable<IOceanographicalObservationsStationResponse>
  oceanographicalObservationsPeriod$?: Observable<IOceanographicalObservationsPeriodResponse>
  oceanographicalObservationsData$?: Observable<IOceanographicalObservationsDataResponse>

  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
   
  ngOnInit(): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.oceanographicalObservationsStation$ = this.oceanographicalObservationsService.getStation(parameter, station)
  }

  setPeriodData(period: string): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.oceanographicalObservationsPeriod$ = this.oceanographicalObservationsService.getPeriod(parameter, station, period)
      this.oceanographicalObservationsData$ = this.oceanographicalObservationsService.getPeriodData(parameter, station, period)
  }

  back(): void {
    this.router.navigate(['/oceanographical-observations', 'parameter', this.route.snapshot.paramMap.get("parameter")])
  }
}

