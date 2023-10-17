import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IHydrologicalObservationsPeriodResponse } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-period-response';
import { IHydrologicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-station-response';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';

@Component({
  selector: 'app-hydrological-detailed-station',
  templateUrl: './hydrological-detailed-station.component.html',
  styleUrls: ['./hydrological-detailed-station.component.css']
})
export class HydrologicalDetailedStationComponent implements OnInit {

  hydrologicalObservationsStation$?: Observable<IHydrologicalObservationsStationResponse>
  hydrologicalObservationsPeriod$?: Observable<IHydrologicalObservationsPeriodResponse>

  constructor(
    private hydrologicalObservationsService: HydrologicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
   
  ngOnInit(): void {
      const parameter = this.route.snapshot.paramMap.get("parameter") as string
      const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
      this.hydrologicalObservationsStation$ = this.hydrologicalObservationsService.getStation(parameter, station).pipe(
        tap((data) => console.log(data))
      )
  }

  back(): void {
    this.router.navigate(['/hydrological-observations', 'parameter', this.route.snapshot.paramMap.get("parameter")])
  }
}

