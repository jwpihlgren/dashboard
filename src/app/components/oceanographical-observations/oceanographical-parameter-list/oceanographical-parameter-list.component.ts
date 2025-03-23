import { DatePipe } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationListComponent } from 'src/app/shared/components/navigation-list/navigation-list.component';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IOceanographicalObservationsVersionResponse, IOceanographicalObservationsVersionResponseResource } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-version-response';
import { OceanographicalObservationsService } from 'src/app/shared/services/oceanographical-observations.service';

@Component({
  selector: 'app-oceanographical-parameter-list',
  templateUrl: './oceanographical-parameter-list.component.html',
  styleUrls: ['./oceanographical-parameter-list.component.css'],
  imports: [DatePipe, NavigationListComponent]
})
export class OceanographicalParameterListComponent {

  protected oceanographicalObservationsService: OceanographicalObservationsService = inject(OceanographicalObservationsService)
  oceanographicalObservationsParameters: Signal<IOceanographicalObservationsVersionResponse | undefined> = signal(undefined)

  constructor() {
    this.oceanographicalObservationsParameters = toSignal(this.oceanographicalObservationsService.getParameters())
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
