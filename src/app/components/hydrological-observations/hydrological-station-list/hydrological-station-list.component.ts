import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NavigationListComponent } from 'src/app/shared/components/navigation-list/navigation-list.component';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IHydrologicalObservationsParameterResponse, IHydrologicalObservationsParameterResponseStation } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-parameter-response ';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';


@Component({
  selector: 'app-hydrological-station-list',
  templateUrl: './hydrological-station-list.component.html',
  styleUrls: ['./hydrological-station-list.component.css'],
  imports: [NavigationListComponent]
})
export class HydrologicalStationListComponent {

  protected hydrologicalObservationsService: HydrologicalObservationsService = inject(HydrologicalObservationsService)
  protected route: ActivatedRoute = inject(ActivatedRoute)
  protected router: Router = inject(Router)

  hydrologicalObservationsStations: Signal<IHydrologicalObservationsParameterResponse | undefined> = signal(undefined)

  constructor() {
    this.hydrologicalObservationsStations = toSignal(this.route.paramMap.pipe(
      switchMap(params => {
        const parameter = params.get("parameter") as string
        return this.hydrologicalObservationsService.getStations(parameter)
      })
    ))
  }

  getNavigationItems(stations: IHydrologicalObservationsParameterResponseStation[]): INavigationItem[] {
    const navigationItems: INavigationItem[] = []
    stations.forEach(station => {
      navigationItems.push({
        title: `${station.title.split(' - ')[1]} - ${station.key}`,
        link: ['station', station.key]
      })
    })
    return navigationItems
  }

  back(): void {
    this.router.navigate(['/hydrological-observations'])
  }
}
