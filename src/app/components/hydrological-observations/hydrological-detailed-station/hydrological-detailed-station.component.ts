import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { IHydrologicalObservationsPeriodResponse } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-period-response ';
import { IHydrologicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-station-response ';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';


@Component({
  selector: 'app-hydrological-detailed-station',
  templateUrl: './hydrological-detailed-station.component.html',
  styleUrls: ['./hydrological-detailed-station.component.css'],
  imports: [RouterOutlet, RouterLinkActive, RouterLink, DatePipe, NgClass]
})
export class HydrologicalDetailedStationComponent {
  protected hydrologicalObservationsService: HydrologicalObservationsService = inject(HydrologicalObservationsService)
  protected route: ActivatedRoute = inject(ActivatedRoute)
  protected router: Router = inject(Router)

  hydrologicalObservationsStation: Signal<IHydrologicalObservationsStationResponse | undefined> = signal(undefined)
  hydrologicalObservationsPeriod: Signal<IHydrologicalObservationsPeriodResponse | undefined> = signal(undefined)

  constructor() {
    const parameter = this.route.snapshot.paramMap.get("parameter") as string
    const station = parseInt(this.route.snapshot.paramMap.get("station") as string)
    this.hydrologicalObservationsStation = toSignal(this.hydrologicalObservationsService.getStation(parameter, station).pipe(
      tap((data) => console.log(data))
    ))
  }

  back(): void {
    this.router.navigate(['/hydrological-observations', 'parameter', this.route.snapshot.paramMap.get("parameter")])
  }
}

