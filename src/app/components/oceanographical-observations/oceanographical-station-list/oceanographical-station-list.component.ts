import { IOceanographicalObservationsParameterResponseStation } from './../../../shared/models/interfaces/smhi/oceanographical-observations-parameter-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
export class OceanographicalStationListComponent implements OnInit {


  oceanographicalObservationsStations$?: Observable<IOceanographicalObservationsParameterResponse>

  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.oceanographicalObservationsStations$ = this.oceanographicalObservationsService.getStations(params.get("parameter") as string).pipe(
        tap(stations => console.log(stations))
      )
    })
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
