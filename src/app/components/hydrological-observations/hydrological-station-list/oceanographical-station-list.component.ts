import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
export class HydrologicalStationListComponent implements OnInit {


  hydrologicalObservationsStations$?: Observable<IHydrologicalObservationsParameterResponse>

  constructor(
    private hydrologicalObservationsService: HydrologicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hydrologicalObservationsStations$ = this.hydrologicalObservationsService.getStations(params.get("parameter") as string).pipe(
        tap(stations => console.log(stations))
      )
    })
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
