import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IHydrologicalObservationsVersionResponse, IHydrologicalObservationsVersionResponseResource } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-version-response ';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';

@Component({
  selector: 'app-hydrological-parameter-list',
  templateUrl: './hydrological-parameter-list.component.html',
  styleUrls: ['./hydrological-parameter-list.component.css']
})
export class HydrologicalParameterListComponent implements OnInit{

  hydrologicalObservationsParameters$?: Observable<IHydrologicalObservationsVersionResponse>
  
  constructor(
    private hydrologicalObservationsService: HydrologicalObservationsService
    ) { }

  ngOnInit(): void {
    this.hydrologicalObservationsParameters$ = this.hydrologicalObservationsService.getParameters()
  }
  
  
  getNavigationItems(parameters: IHydrologicalObservationsVersionResponseResource[]): INavigationItem[] {
    const navigationItems: INavigationItem[] = []
    parameters.forEach(parameter => {
      navigationItems.push({
        title: `${parameter.title} (${parameter.key})`,
        link: ['parameter', parameter.key]
      })
    })
    return navigationItems
  }
}
