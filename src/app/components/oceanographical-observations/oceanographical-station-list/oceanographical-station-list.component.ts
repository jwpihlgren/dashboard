import { IOceanographicalObservationsParameterResponseStation } from './../../../shared/models/interfaces/smhi/oceanographical-observations-parameter-response';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NavigationListComponent } from 'src/app/shared/components/navigation-list/navigation-list.component';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IOceanographicalObservationsParameterResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-parameter-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-station-list',
  templateUrl: './oceanographical-station-list.component.html',
  styleUrls: ['./oceanographical-station-list.component.css'],
  imports: [NavigationListComponent]
})
export class OceanographicalStationListComponent {
  protected oceanographicalObservationsService: OceanographicalObservationsService = inject(OceanographicalObservationsService)
  protected route: ActivatedRoute = inject(ActivatedRoute)
  protected router: Router = inject(Router)


  oceanographicalObservationsStations: Signal<IOceanographicalObservationsParameterResponse | undefined> = signal(undefined)

  constructor() {
    this.oceanographicalObservationsStations = toSignal(
      this.route.paramMap.pipe(
        switchMap(params => {
          return this.oceanographicalObservationsService.getStations(params.get("parameter") as string)
        })
      )
    )
  }

  getNavigationItems(stations: IOceanographicalObservationsParameterResponseStation[]): INavigationItem[] {
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
    this.router.navigate(['/oceanographical-observations'])
  }
}
