import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IOceanographicalObservationsVersionResponse, IOceanographicalObservationsVersionResponseResource } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-version-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-parameter-list',
  templateUrl: './oceanographical-parameter-list.component.html',
  styleUrls: ['./oceanographical-parameter-list.component.css']
})
export class OceanographicalParameterListComponent implements OnInit{

  oceanographicalObservationsParameters$?: Observable<IOceanographicalObservationsVersionResponse>
  
  constructor(
    private oceanographicalObservationsService: OceanographicalObservationsService
    ) { }

  ngOnInit(): void {
    this.oceanographicalObservationsParameters$ = this.oceanographicalObservationsService.getParameters()
  }
  
  
  getNavigationItems(parameters: IOceanographicalObservationsVersionResponseResource[]): INavigationItem[] {
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
