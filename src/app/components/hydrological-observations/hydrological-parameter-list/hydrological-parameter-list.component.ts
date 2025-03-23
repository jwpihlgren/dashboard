import { DatePipe } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationListComponent } from 'src/app/shared/components/navigation-list/navigation-list.component';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IHydrologicalObservationsVersionResponse, IHydrologicalObservationsVersionResponseResource } from 'src/app/shared/models/interfaces/smhi/hydrological-observations-version-response ';
import { HydrologicalObservationsService } from 'src/app/shared/services/hydrological-observations.service';

@Component({
  selector: 'app-hydrological-parameter-list',
  templateUrl: './hydrological-parameter-list.component.html',
  styleUrls: ['./hydrological-parameter-list.component.css'],
  imports: [DatePipe, NavigationListComponent]
})
export class HydrologicalParameterListComponent {

  protected hydrologicalObservationsService: HydrologicalObservationsService = inject(HydrologicalObservationsService)
  hydrologicalObservationsParameters: Signal<IHydrologicalObservationsVersionResponse | undefined> = signal(undefined)

  constructor() {
    this.hydrologicalObservationsParameters = toSignal(this.hydrologicalObservationsService.getParameters())
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
